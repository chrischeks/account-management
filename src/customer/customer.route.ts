import { Router } from 'express';
import Route from '@/universal/interfaces/route.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import verifyKey from '@/middlewares/verify.middleware';
import { isAdmin } from '@/middlewares/admin.middleware';
import UsersController from '@/customer/customer.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateCustomerDto } from './customer.dto';

class CustomerRoute implements Route {
  public userPath = '/account';

  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.userPath}`, verifyKey, authMiddleware, this.usersController.getUserById);
    this.router.post(`${this.userPath}/open`, validationMiddleware(CreateCustomerDto, 'body'), this.usersController.openAccount);
  }
}

export default CustomerRoute;
