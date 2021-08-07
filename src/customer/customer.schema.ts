import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ICustomer } from './customer.interface';

export const CustomerSchema = new Schema(
  {
    name: String,
    password: String,
    pin: String,
    email: String,
    account: [
      {
        accountType: { type: String, default: 'mono-savings' },
        accountNumber: String,
        balance: { type: Number, default: 0.0 },
        denomination: { type: String, default: 'kobo' },
      },
    ],
  },
  { timestamps: true },
);

CustomerSchema.plugin(mongoosePaginate);

const Customer = model<ICustomer>('customers', CustomerSchema);

export default Customer;
