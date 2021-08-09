import { NextFunction, Response, Request } from 'express';
import PaymentService from './payment.service';
import { TransferDTO } from './payment.dto';
import UniversalController from '@/@universal/controller/universal.controller';

class PaymentController extends UniversalController {
  paymentService = new PaymentService();
  public localTransfer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = req;
      const userData: TransferDTO = body;
      const response = await this.paymentService.processLocalTransfer(req['customer'], userData);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };

  public transactionHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { params, query } = req;
      const userData: string = params.accountNumber;
      const response = await this.paymentService.processTransactionHistory(req['customer'], userData, query);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };
}

export default PaymentController;
