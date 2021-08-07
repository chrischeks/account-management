import { ICustomer } from '@/customer/customer.interface';
import { Request } from 'express';

export interface RequestWithCustomer extends Request {
  customer: ICustomer;
}
