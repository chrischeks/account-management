import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import config from 'config';
import UniversalController from '@/universal/universal.controller';

const verifyKey = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const invalidAuth = { message: 'Invalid authentication..', status: false, statusCode: 401 };
  const controller = new UniversalController();

  const key = req.headers['x-api-key'];
  const timestamp = Number(req.headers['timestamp']);

  if (!key || !timestamp) {
    return await controller.controllerResponseHandler(invalidAuth, req, res);
  }
  const API_KEY = config.get('api_key');
  const text = `${API_KEY}|${timestamp}`;
  const hash = crypto.createHash('sha512', API_KEY).update(text).digest('hex');

  const timeDiff = Date.now() - timestamp;
  if (hash !== key || timeDiff > 300000) {
    return await controller.controllerResponseHandler(invalidAuth, req, res);
  }
  next();
};

export default verifyKey;
