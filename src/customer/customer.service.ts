import * as bcrypt from 'bcrypt';
import IResponse from '@/universal/interfaces/response.interface';
import { getRepository } from 'typeorm';
// import { User } from '@/customer/user.interface';
import Status from '@/enums/status.enum';
import UniversalService from '@/universal/universal.service';
import { CreateCustomerDto } from './customer.dto';
import Customer from './customer.schema';
import { ICustomer } from './customer.interface';

class UserService extends UniversalService {
  // public async findAllUsers(query: PaginationDto): Promise<IResponse> {
  //   const { take = 10, skip = 0 } = query;
  //   const userRepository = getRepository(this.users);
  //   const findUser: User[] = await userRepository.find({ order: { createdAt: 'DESC' }, take, skip });
  //   return this.successResponse('success', findUser, Status.SUCCESS);
  // }
  public processCreateCustomer = async (customer: CreateCustomerDto) => {
    let { pin, password, email, name } = customer;
    // const accountExists = await Customer.findOne({ email, 'account.accountType': accountType });

    pin = await bcrypt.hash(pin, 10);
    password = await bcrypt.hash(password, 10);
    const account = [{ accountType: 'mono-savings', accountNumber: await this.generateAccountNumber() }];
    const createUser: ICustomer = await Customer.create({ pin, password, account, name, email });
    if (!createUser) return this.failureResponse('Account opening failed');
    return this.successResponse();
  };

  private generateAccountNumber = async (): Promise<string> => {
    const dateLast5 = `${Date.now()}`.substring(8);
    const randomNum = `${Math.floor(Math.random() * 100000)}`;
    return `${dateLast5}${randomNum}`;
  };

  // public processOpeningAccount = async (customer, body) => {
  //   let { email, account } = customer as ICustomer;
  //   const { accountType } = body;
  //   const found = account.find(x => x.accountType === accountType);
  //   if (found) return this.failureResponse('');
  //   // const accountExists = await Customer.findOne({ email, 'account.accountType': accountType });

  //   // const account = [{ accountType: 'mono-savings', accountNumber: await this.generateAccountNumber() }];
  //   const createUser: ICustomer = await Customer.create({ pin, password, account, name, email });
  //   if (!createUser) return this.failureResponse('Account opening failed');
  //   return this.successResponse();
  // };
}

export default UserService;
