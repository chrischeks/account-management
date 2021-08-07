import { NextFunction, Response, Request } from 'express';
import UniversalController from '@/universal/universal.controller';
import userService from './customer.service';
import { RequestWithUser } from '@/auth/auth.interface';
import { CreateCustomerDto } from './customer.dto';

class UsersController extends UniversalController {
  public userService = new userService();

  // public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     await this.controllerResponseHandler({ statusCode: 200, status: true, message: 'success', data: req.user }, req, res);
  //   } catch (error) {
  //     await this.controllerErrorHandler(req, res, error);
  //     next();
  //   }
  // };

  public openAccount = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateCustomerDto = req.body;
      const response = await this.userService.processCreateCustomer(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };
}

export default UsersController;
