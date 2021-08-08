import { Router } from 'express';
import Route from '@/universal/interfaces/route.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import CustomerController from '@/customer/customer.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { AccountOpenDTO } from './customer.dto';
import { AccountNumberDTO } from '@/universal/dto/account.dto';

class CustomerRoute implements Route {
  public userPath = '/customer';

  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.userPath}/account/open-account`,
      authMiddleware,
      validationMiddleware(AccountOpenDTO, 'body'),
      this.customerController.openAccount,
    );
    this.router.get(
      `${this.userPath}/name-enquiry/:accountNumber`,
      authMiddleware,
      validationMiddleware(AccountNumberDTO, 'params'),
      this.customerController.getCustomerByAccountNumber,
    );
  }
}

export default CustomerRoute;
