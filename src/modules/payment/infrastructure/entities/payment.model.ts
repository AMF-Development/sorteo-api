import mongoose, { Document, Schema } from "mongoose";
import { IPayment } from "../../application/interfaces/payment.interface";

export const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: Number, required: false },
    preferenceId: { type: String, required: true },
    externalReference: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export interface IPaymentDocument extends IPayment, Document {}

const Payment = mongoose.model<IPaymentDocument>("Payment", PaymentSchema);

export default Payment;
