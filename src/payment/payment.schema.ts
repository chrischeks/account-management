import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ITransfer } from './payment.interface';
// import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

export const PaymentSchema = new Schema(
  {
    amount: Number,
    creditAccount: String,
    debitAccount: String,
    narration: String,
    charge: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// PaymentSchema.plugin(mongoosePaginate);
// PaymentSchema.plugin(aggregatePaginate);

const Payment = model<ITransfer>('payments', PaymentSchema);

export default Payment;
