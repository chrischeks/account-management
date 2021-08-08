import { NextFunction, Response, Request } from 'express';
import UniversalController from '@/universal/universal.controller';
import userService from './customer.service';
import { CreateCustomerDTO, AccountOpenDTO, SignInDTO, GetCustomerDTO } from './customer.dto';
import { RequestWithCustomer } from '@/universal/interfaces/request.interface';

class CustomerController extends UniversalController {
  public userService = new userService();

  public createCustomer = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateCustomerDTO = req.body;
      const response = await this.userService.processCreateCustomer(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public signIn = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SignInDTO = req.body;
      const response = await this.userService.processSignIn(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public openAccount = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { customer, body } = req;
      const userData: AccountOpenDTO = body;
      const response = await this.userService.processAccountOpening(customer, userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public getCustomerByAccountNumber = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { params } = req;
      const userData: string = params.accountNumber;
      const response = await this.userService.processGetCustomerByAccountNumber(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };
}

export default CustomerController;
