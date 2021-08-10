import { NextFunction, Request, Response } from 'express';
import { AccountOpenDTO } from './customer.dto';
import CustomerService from './customer.service';
import UniversalController from '@/@universal/controller/universal.controller';

class CustomerController extends UniversalController {
  public customerService = new CustomerService();

  public openAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = req;
      const userData: AccountOpenDTO = body;
      const response = await this.customerService.processAccountOpening(req['customer'], userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public getCustomerByAccountNumber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { params } = req;
      const userData: string = params.accountNumber;
      const response = await this.customerService.processGetCustomerByAccountNumber(userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };
}

export default CustomerController;
