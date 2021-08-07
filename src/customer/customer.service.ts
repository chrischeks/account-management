import * as bcrypt from 'bcrypt';
import IResponse from '@/universal/interfaces/response.interface';
import { getRepository } from 'typeorm';
// import { User } from '@/customer/user.interface';
import Status from '@/enums/status.enum';
import UniversalService from '@/universal/universal.service';
import { CreateCustomerDTO, AccountOpenDTO } from './customer.dto';
import Customer from './customer.schema';
import { IAccountOpen, ICustomer, ISignIn } from './customer.interface';
import { DataStoredInToken, TokenData } from '@/universal/interfaces/token.interface';
import jwt from 'jsonwebtoken';
const { JWTSECRET } = process.env;

class CustomerService extends UniversalService {
  private customer = Customer;
  public processCreateCustomer = async (customer: CreateCustomerDTO) => {
    let { pin, password, email, name } = customer;
    pin = await bcrypt.hash(pin, 10);
    password = await bcrypt.hash(password, 10);
    email = email.toLowerCase();
    const account = [{ accountType: 'mono-savings', accountNumber: await this.generateAccountNumber() }];
    const createUser: ICustomer = await this.customer.create({ pin, password, account, name, email });
    if (!createUser) return this.failureResponse('Signup failed');
    return this.successResponse();
  };

  public processSignIn = async (customerData: ISignIn) => {
    let { password, email } = customerData;
    email = email.toLowerCase();
    const foundUser: ICustomer = await this.customer.findOne({ email });
    if (!foundUser) return this.failureResponse('Invalid email or password.');
    const isPasswordMatching: boolean = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatching) return this.failureResponse('Invalid mobile number or password.');
    const tokenData = await this.createToken(foundUser);
    return this.successResponse({ tokenData });
  };

  public async createToken(customer: ICustomer): Promise<TokenData> {
    const dataStoredInToken: DataStoredInToken = { _id: customer._id };
    const secretKey: string = JWTSECRET;
    const expiresIn: string = '1d';
    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
  // public createCookie(tokenData: TokenData): string {
  //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  // }

  private generateAccountNumber = async (): Promise<string> => {
    const dateLast5 = `${Date.now()}`.substring(8);
    const randomNum = `${Math.floor(Math.random() * 100000)}`;
    return `${dateLast5}${randomNum}`;
  };

  public processAccountOpening = async (customer: ICustomer, body: AccountOpenDTO) => {
    let { email, account } = customer;
    console.log(email, account, 'email, account');

    const { accountType } = body;
    const found = account.find(x => x.accountType === accountType);
    console.log(found);

    if (found) return this.failureResponse(`You already have a ${accountType} account`);
    const createAccount = await this.customer.updateOne(
      { email },
      { $push: { account: { accountNumber: await this.generateAccountNumber(), accountType } } },
    );
    if (createAccount.nModified === 0) return this.failureResponse('Account opening failed');
    return this.successResponse();
  };
}

export default CustomerService;
