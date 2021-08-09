import { NextFunction, Response, Request } from 'express';
import AuthService from './auth.service';
import { SignInDTO } from './auth.dto';
import { CreateCustomerDTO } from '@/@universal/dto/customer.dto';
import UniversalController from '@/@universal/controller/universal.controller';
import { ICustomer } from '@/@universal/interfaces/customer.interface';

class AuthController extends UniversalController {
  public authService = new AuthService();

  public createCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateCustomerDTO = req.body;
      const response = await this.authService.processCreateCustomer(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public signIn = async (req: Request & { customer: ICustomer }, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SignInDTO = req.body;
      const response = await this.authService.processSignIn(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };
}

export default AuthController;
