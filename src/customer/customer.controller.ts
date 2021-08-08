import { NextFunction, Response } from 'express';
import { AccountOpenDTO } from './customer.dto';
import { RequestWithCustomer } from '@/@universal/interfaces/request.interface';
import CustomerService from './customer.service';
import UniversalController from '@/@universal/controller/universal.controller';

class CustomerController extends UniversalController {
  protected customerService = new CustomerService();

  public openAccount = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { customer, body } = req;
      const userData: AccountOpenDTO = body;
      const response = await this.customerService.processAccountOpening(customer, userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public getCustomerByAccountNumber = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
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
