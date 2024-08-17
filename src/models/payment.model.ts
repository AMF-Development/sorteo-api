import mongoose, { Document, Schema } from "mongoose";
import { IPayment } from "@/interfaces/payment.interface";
import { PaymentStatus } from "@/enum/payment-status.enum";

export const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: Number, required: false },
    preferenceId: { type: String, required: true },
    externalReference: { type: String, required: true },
    status: { type: PaymentStatus, required: true },
  },
  {
    timestamps: true,
  }
);

export interface IPaymentDocument extends IPayment, Document {}

const Payment = mongoose.model<IPaymentDocument>("Payment", PaymentSchema);

export default Payment;
