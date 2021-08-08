import { Router } from 'express';
import Route from '@/universal/interfaces/route.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import verifyKey from '@/middlewares/verify.middleware';
import { isAdmin } from '@/middlewares/admin.middleware';
import CustomerController from '@/customer/customer.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import PaymentController from './payment.controller';
import { TransferDTO } from './payment.dto';
import { AccountNumberDTO } from '@/universal/dto/account.dto';

class PaymentRoute implements Route {
  public paymentPath = '/payment';

  public router = Router();
  public paymentController = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.paymentPath}/transfer`, authMiddleware, validationMiddleware(TransferDTO, 'body'), this.paymentController.localTransfer);
    this.router.get(
      `${this.paymentPath}/transactions/:accountNumber`,
      authMiddleware,
      validationMiddleware(AccountNumberDTO, 'params'),
      this.paymentController.transactionHistory,
    );
  }
}

export default PaymentRoute;
