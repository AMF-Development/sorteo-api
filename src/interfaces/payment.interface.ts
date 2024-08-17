import { PaymentStatus } from "@/enum/payment-status.enum";

export interface IPayment {
  paymentId?: number;
  preferenceId: string;
  externalReference: string;
  status: PaymentStatus;
}
