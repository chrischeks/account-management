import { Request } from 'express';
import { ICustomer } from './customer.interface';

export interface RequestWithCustomer extends Request {
  customer: ICustomer;
}
