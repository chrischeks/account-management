import { NextFunction, Response } from 'express';
import { RequestWithCustomer } from '@/@universal/interfaces/request.interface';
import AuthService from './auth.service';
import { SignInDTO } from './auth.dto';
import { CreateCustomerDTO } from '@/@universal/dto/customer.dto';
import UniversalController from '@/@universal/controller/universal.controller';

class AuthController extends UniversalController {
  public authService = new AuthService();

  public createCustomer = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateCustomerDTO = req.body;
      const response = await this.authService.processCreateCustomer(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public signIn = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
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
