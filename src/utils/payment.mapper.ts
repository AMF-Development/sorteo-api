import { IPayment } from "@/interfaces/payment.interface";
import Payment, { IPaymentDocument } from "@/models/payment.model";

export function paymentMapper(payment: any): IPaymentDocument {
  const newPayment = new Payment();
  newPayment.paymentId = payment.paymentId;
  newPayment.preferenceId = payment.preferenceId;
  newPayment.externalReference = payment.externalReference;
  newPayment.status = payment.status;
  return newPayment;
}
