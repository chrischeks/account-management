import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithCustomer } from '@/@universal/interfaces/request.interface';
import customerModel from '@/customer/customer.model';
import UniversalController from '../controller/universal.controller';
import { DataStoredInToken } from '@/auth/auth.interface';

const { JWTSECRET } = process.env;

const authMiddleware = async (req: RequestWithCustomer, res: Response, next: NextFunction) => {
  const auth = { status: false, statusCode: 401 };
  const controller = new UniversalController();
  try {
    const Authorization = req.header('Authorization')?.split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = JWTSECRET;
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const _id = verificationResponse._id;

      const foundUser = await customerModel.findById(_id);
      if (foundUser) {
        req.customer = foundUser;
        next();
      } else {
        await controller.controllerResponseHandler({ ...auth, message: 'Wrong authentication token.' }, req, res);
      }
    } else {
      await controller.controllerResponseHandler({ ...auth, message: 'Authentication token missing.' }, req, res);
    }
  } catch (error) {
    console.log(error, 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

    await controller.controllerResponseHandler({ ...auth, message: 'Wrong/expired authentication token.' }, req, res);
  }
};

export default authMiddleware;
