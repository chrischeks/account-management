import { RequestWithUser } from '@/auth/auth.interface';
import IResponse from '@/universal/interfaces/response.interface';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';

class UniversalController {
  protected controllerErrorHandler = async (req: Request, res: Response, error) => {
    const { originalUrl, method, ip } = req;
    logger.log('error', `URL:${originalUrl} - METHOD:${method} - IP:${ip} - ERROR:${error}`);
    return res.status(500).json({ status: false, message: 'Operation was not successful, please contact support.', data: null });
  };

  public controllerResponseHandler = async (response: IResponse, req: RequestWithUser, res: Response) => {
    const { statusCode, status, message, data } = response;
    const { originalUrl, method, ip, body, user } = req;
    logger.log(
      `${status === true ? 'info' : 'warn'}`,
      `URL:${originalUrl} - METHOD:${method} - IP:${ip}- StatusCode : ${statusCode} - Message : ${message} - Email:${body.email || user._id}`,
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
