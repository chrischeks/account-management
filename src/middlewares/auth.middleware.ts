import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import UniversalController from '@/universal/universal.controller';
import { DataStoredInToken } from '@/universal/interfaces/token.interface';
import { RequestWithCustomer } from '@/universal/interfaces/request.interface';
import Customer from '@/customer/customer.schema';

const { JWTSECRET } = process.env;

const authMiddleware = async (req: RequestWithCustomer, res: Response, next: NextFunction) => {
  const auth = { status: false, statusCode: 401 };
  const controller = new UniversalController();
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization')?.split('Bearer ')[1] || null;
    console.log(Authorization, 'mmmmmm');

    if (Authorization) {
      const secretKey: string = JWTSECRET;
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const _id = verificationResponse._id;

      const foundUser = await Customer.findById(_id);
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
    console.log(1111111111);

    await controller.controllerResponseHandler({ ...auth, message: 'Wrong/expired authentication token.' }, req, res);
  }
};

export default authMiddleware;
