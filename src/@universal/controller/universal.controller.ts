import IResponse from '@/@universal/interfaces/response.interface';
import { Response } from 'express';
import { RequestWithCustomer } from '../interfaces/request.interface';
import { logger } from '../logger/logger';

class UniversalController {
  protected controllerErrorHandler = async (req: RequestWithCustomer, res: Response, error) => {
    const { originalUrl, method, ip, customer, body } = req;
    console.log(error, 'errorrrrrrrrrrrrrrrrrrrrrrrr');

    logger.log('error', `URL:${originalUrl} - METHOD:${method} - IP:${ip} - ERROR:${error}- Identifier:${customer?.email || body?.email}`);
    return res.status(500).json({ status: false, message: 'Operation was not successful, please contact support.', data: null });
  };

  public controllerResponseHandler = async (response: IResponse, req: RequestWithCustomer, res: Response) => {
    const { statusCode, status, message, data } = response;
    const { originalUrl, method, ip, body, customer } = req;
    logger.log(
      `${status === true ? 'info' : 'warn'}`,
      `URL:${originalUrl} - METHOD:${method} - IP:${ip}- StatusCode : ${statusCode} - Message : ${message} - Identifier:${
        customer?.email || body?.email
      }`,
    );
    return res.status(statusCode).json({ status, message, data });
  };

  protected getIP = async (ip): Promise<string> => {
    // for both ipv4 and ipv6
    if (ip.substr(0, 7) == '::ffff:') {
      ip = ip.substr(7);
    }
    return ip;
  };
}

export default UniversalController;
