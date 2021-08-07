import { RequestWithUser } from '@/auth/auth.interface';
import UniversalController from '@/universal/universal.controller';
import { NextFunction, Response } from 'express';

export const isAdmin = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  if (req.user.role !== 'admin') {
    return await new UniversalController().controllerResponseHandler(
      { message: 'You do not have sufficient permission', status: false, statusCode: 401 },
      req,
      res,
    );
  }
  next();
};
