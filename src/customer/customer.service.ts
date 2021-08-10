import { ICustomer } from '@/@universal/interfaces/customer.interface';
import UniversalService from '@/@universal/service/universal.service';
import { AccountOpenDTO } from './customer.dto';
import customerModel from './customer.model';

class CustomerService extends UniversalService {
  public customer = customerModel;

  public processAccountOpening = async (customer: ICustomer, body: AccountOpenDTO) => {
    let { email, account } = customer;
    const { accountType } = body;
    const found = account.find(acc => acc.accountType === accountType);
    if (found) return this.failureResponse(`You already have a ${accountType} account`);
    const newAccount = { accountNumber: await this.generateAccountNumber(), accountType };
    const createAccount = await this.customer.updateOne({ email }, { $push: { account: newAccount } });
    if (createAccount.nModified === 0) return this.failureResponse('Account opening failed');
    return this.successResponse(newAccount);
  };

  public processGetCustomerByAccountNumber = async (accountNumber: string) => {
    const customer = await this.customer.findOne({ 'account.accountNumber': accountNumber }, { name: 1, _id: 0 });
    if (!customer) return this.failureResponse('Invalid account number');
    return this.successResponse({ customerName: customer.name });
  };
}

export default CustomerService;
