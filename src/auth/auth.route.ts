import { Router } from 'express';
import Route from '@/@universal/interfaces/route.interface';
import validationMiddleware from '@/@universal/middlewares/validation.middleware';
import { SignInDTO } from './auth.dto';
import { CreateCustomerDTO } from '@/@universal/dto/customer.dto';
import AuthController from './auth.controller';

class AuthRoute implements Route {
  public authPath = '/auth';

  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.authPath}/create`, validationMiddleware(CreateCustomerDTO, 'body'), this.authController.createCustomer);
    this.router.post(`${this.authPath}/signIn`, validationMiddleware(SignInDTO, 'body'), this.authController.signIn);
  }
}

export default AuthRoute;
