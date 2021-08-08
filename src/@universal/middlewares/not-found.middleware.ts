import { RequestWithCustomer } from '@/@universal/interfaces/request.interface';
import { NextFunction, Response } from 'express';
import UniversalController from '../controller/universal.controller';

const notFound = async (req: RequestWithCustomer, res: Response, next: NextFunction) => {
  return await new UniversalController().controllerResponseHandler({ message: 'Route not found.', status: false, statusCode: 404 }, req, res);
};

export default notFound;
