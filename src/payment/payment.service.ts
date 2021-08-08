import IResponse from '@/universal/interfaces/response.interface';
import UniversalService from '@/universal/universal.service';
import { ITransfer } from './payment.interface';
import mongoose from 'mongoose';
import customerModel from '@/customer/customer.model';
import Payment from './payment.schema';
import { ICustomer } from '@/universal/interfaces/customer.interface';

class PaymentService extends UniversalService {
  private customer = customerModel;
  private payment = Payment;
  public processLocalTransfer = async (customer: ICustomer, body) => {
    const { debitAccount, creditAccount, narration = `Mono fund transfer`, amount } = body as ITransfer;
    let { email } = customer;
    email = email.toLowerCase();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const opts = { session, new: true, projection: { account: { $elemMatch: { accountNumber: debitAccount } }, _id: 0 } };
      const senderAccount = await this.customer.findOneAndUpdate(
        { email, 'account.accountNumber': debitAccount },
        { $inc: { 'account.$.balance': -(amount * 100) } },
        opts,
      );
      if (!senderAccount || senderAccount.account.length < 1) return this.failureResponse('Invalid debit account');
      if (senderAccount.account[0].balance < 0) {
        session.abortTransaction();
        return this.failureResponse('Insufficient balance');
      }

      const receiverAccount = await this.customer.findOneAndUpdate(
        { 'account.accountNumber': creditAccount },
        { $inc: { 'account.$.balance': amount * 100 } },
        opts,
      );
      if (!receiverAccount) {
        session.abortTransaction();
        return this.failureResponse('Invalid credit account');
      }
      const payment = new this.payment({ amount, debitAccount, creditAccount, narration });
      await payment.save({ session });
      await session.commitTransaction();
      session.endSession();
      return this.successResponse();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error('Transaction failed');
    }
  };

  public processTransactionHistory = async (customer: ICustomer, accountNumber, query) => {
    let { email } = customer;
    email = email.toLowerCase();
    let { limit, page } = query;
    console.log(email, accountNumber, limit, page);
    limit = Number(limit) || 10;
    page = Number(page) || 1;
    const transactions = await this.payment.aggregate([
      { $match: { $or: [{ creditAccount: accountNumber }, { debitAccount: accountNumber }] } },
      { $addFields: { isDebit: { $cond: { if: { $eq: ['$debitAccount', accountNumber] }, then: true, else: false } } } },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $sort: { createdAt: -1 } }, { $skip: page }, { $limit: limit }],
        },
      },
      {
        $project: {
          data: 1,
          // Get total from the first element of the metadata array
          total: { $arrayElemAt: ['$metadata.total', 0] },
        },
      },
    ]);
    return this.successResponse(transactions);
  };
}

export default PaymentService;
