import { getPaymentByPaymentIdAdapter } from "@/adapters/payment.adapter";
import { paymentApplication } from "@/application/payment.application";
import { PaymentStatus } from "@/enum/payment-status.enum";
import { fromPreferenceToTicket } from "./ticket.mapper";
import { ticketApplication } from "@/application/ticket.application";
import { notificationService } from "@/services/notification.service";

export const handleApprovedPayment = async (
  paymentId: string,
  externalReference: string
) => {
  const payment = await paymentApplication.getPaymentByExternalReference(
    externalReference
  );

  if (payment.status === PaymentStatus.APPROVED) {
    return `${process.env.FRONT_URL}`;
  }

  const { preferenceId } = await paymentApplication.updatePayment(
    externalReference,
    { status: PaymentStatus.APPROVED, paymentId: Number(paymentId) }
  );

  const preference = await getPaymentByPaymentIdAdapter(preferenceId);

  const ticketMapped = fromPreferenceToTicket(preference);
  const ticket = await ticketApplication.createTicket(ticketMapped);
  await notificationService.sendEmailNotification(ticket);
  return `${process.env.FRONT_URL}/pago-confirmado?name=${ticket.name}&email=${ticket.email}&amount=${ticket.amount}`;
};

export const handlePendingPayment = async (
  paymentId: string,
  externalReference: string
) => {
  await paymentApplication.updatePayment(externalReference, {
    status: PaymentStatus.PENDING,
    paymentId: Number(paymentId),
  });
  return `${process.env.FRONT_URL}/pago-pendiente`;
};

export const handleRejectedPayment = async (
  paymentId: string,
  externalReference: string
) => {
  await paymentApplication.updatePayment(externalReference, {
    status: PaymentStatus.REJECTED,
    paymentId: Number(paymentId),
  });
  return `${process.env.FRONT_URL}/pago-rechazado`;
};
