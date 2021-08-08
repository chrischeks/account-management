import { Router } from 'express';
import Route from '@/universal/interfaces/route.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import verifyKey from '@/middlewares/verify.middleware';
import { isAdmin } from '@/middlewares/admin.middleware';
import CustomerController from '@/customer/customer.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateCustomerDTO, AccountOpenDTO, SignInDTO, GetCustomerDTO } from './customer.dto';

class CustomerRoute implements Route {
  public userPath = '/customer';

  public router = Router();
  public usersController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.userPath}/account/open-account`,
      authMiddleware,
      validationMiddleware(AccountOpenDTO, 'body'),
      this.usersController.openAccount,
    );
    this.router.post(`${this.userPath}/create`, validationMiddleware(CreateCustomerDTO, 'body'), this.usersController.createCustomer);
    this.router.post(`${this.userPath}/signIn`, validationMiddleware(SignInDTO, 'body'), this.usersController.signIn);
    this.router.get(
      `${this.userPath}/name-enquiry/:accountNumber`,
      authMiddleware,
      validationMiddleware(GetCustomerDTO, 'params'),
      this.usersController.getCustomerByAccountNumber,
    );
  }
}

export default CustomerRoute;
