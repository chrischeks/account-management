import * as bcrypt from 'bcrypt';
import UniversalService from '@/@universal/universal.service';
import jwt from 'jsonwebtoken';
import customerModel from '@/customer/customer.model';
import { DataStoredInToken, ISignIn, TokenData } from './auth.interface';
import { ICustomer } from '@/@universal/interfaces/customer.interface';
import { CreateCustomerDTO } from '@/@universal/dto/customer.dto';
const { JWTSECRET } = process.env;

class AuthService extends UniversalService {
  protected customer = customerModel;

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
}

export default AuthService;
