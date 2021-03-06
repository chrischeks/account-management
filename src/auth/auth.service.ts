import * as bcrypt from 'bcrypt';
import UniversalService from '@/@universal/service/universal.service';
import jwt from 'jsonwebtoken';
import customerModel from '@/customer/customer.model';
import { DataStoredInToken, ISignIn, TokenData } from './auth.interface';
import { ICustomer } from '@/@universal/interfaces/customer.interface';
import { CreateCustomerDTO } from '@/@universal/dto/customer.dto';
import config from 'config';

class AuthService extends UniversalService {
  public customer = customerModel;

  public processCreateCustomer = async (customer: CreateCustomerDTO) => {
    let { pin, password, email, name } = customer;
    try {
      pin = await bcrypt.hash(pin, 10);
      password = await bcrypt.hash(password, 10);
      email = email.toLowerCase();
      const account = [{ accountType: 'mono-savings', accountNumber: await this.generateAccountNumber() }];
      const createUser: ICustomer = await this.customer.create({ pin, password, account, name, email });
      if (!createUser) return this.failureResponse('Signup failed');
      return this.successResponse(account[0]);
    } catch (error) {
      const { message } = error;
      if (message.includes('duplicate')) return this.failureResponse(`A customer with email ${email} already exist`);
    }
  };

  public processSignIn = async (customerData: ISignIn) => {
    let { password, email } = customerData;
    email = email.toLowerCase();
    const foundUser: ICustomer = await this.customer.findOne({ email }, { password: 1, account: 1 });
    if (!foundUser) return this.failureResponse('Invalid email or password.');
    const isPasswordMatching: boolean = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatching) return this.failureResponse('Invalid mobile number or password.');
    const tokenData = await this.createToken(foundUser);
    return this.successResponse({ tokenData });
  };

  public async createToken(customer: ICustomer): Promise<TokenData> {
    const dataStoredInToken: DataStoredInToken = { _id: customer._id };
    const secretKey: string = config.get('config.secretKey');
    const expiresIn: string = '1d';
    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
