import { ICustomer } from '@/universal/interfaces/customer.interface';
import { Schema, model, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const customerSchema: Schema = new Schema(
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

customerSchema.plugin(mongoosePaginate);

const customerModel = model<ICustomer & Document>('customers', customerSchema);

export default customerModel;
