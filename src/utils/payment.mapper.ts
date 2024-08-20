import { PaymentStatus } from "@/enum/payment-status.enum";
import Payment, { IPaymentDocument } from "@/models/payment.model";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";

export function paymentMapper(payment: PreferenceResponse): IPaymentDocument {
  const newPayment = new Payment();
  newPayment.preferenceId = payment.id;
  newPayment.externalReference = payment.external_reference;
  newPayment.status = PaymentStatus.INITIATED;
  return newPayment;
}
