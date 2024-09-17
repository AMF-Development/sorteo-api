import { getPaymentByPaymentIdAdapter } from "@/modules/notification/infrastructure/adapter/payment.adapter";
import { paymentApplication } from "@/modules/payment/application/payment.application";
import { PaymentStatus } from "@/modules/payment/application/enum/payment-status.enum";
import { fromPreferenceToTicket } from "@/modules/ticket/application/utils/ticket.mapper";
import { ticketApplication } from "@/modules/ticket/application/ticket.application";
import { notificationService } from "@/modules/notification/application/service/notification.service";
import { NumberLotteryApplication } from "@/modules/numbers/application/numbers.application";

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
  const numbers = await NumberLotteryApplication.getNumbersByTicket(
    ticket._id as string
  );
  const formattedNumbers = numbers
    .map((num: { number: string }) => num.number) // Extrae el campo 'number'
    .join(",");
  await notificationService.sendEmailConfirmedNotification(ticket);
  return `${process.env.FRONT_URL}/pago-confirmado?name=${ticket.name}&email=${ticket.email}&numbers=${formattedNumbers}`;
};

export const handlePendingPayment = async (
  paymentId: string,
  externalReference: string
) => {
  const payment = await paymentApplication.getPaymentByExternalReference(
    externalReference
  );

  if (payment.status === PaymentStatus.PENDING) {
    return `${process.env.FRONT_URL}`;
  }
  const { preferenceId } = await paymentApplication.updatePayment(
    externalReference,
    {
      status: PaymentStatus.PENDING,
      paymentId: Number(paymentId),
    }
  );
  const preference = await getPaymentByPaymentIdAdapter(preferenceId);
  const ticketMapped = fromPreferenceToTicket(preference);

  await notificationService.sendEmailPendingNotification(ticketMapped);
  return `${process.env.FRONT_URL}/pago-pendiente`;
};

export const handleRejectedPayment = async (
  paymentId: string,
  externalReference: string
) => {
  const payment = await paymentApplication.getPaymentByExternalReference(
    externalReference
  );
  if (payment.status === PaymentStatus.REJECTED) {
    return `${process.env.FRONT_URL}`;
  }
  const { preferenceId } = await paymentApplication.updatePayment(
    externalReference,
    {
      status: PaymentStatus.REJECTED,
      paymentId: Number(paymentId),
    }
  );
  const preference = await getPaymentByPaymentIdAdapter(preferenceId);
  const ticketMapped = fromPreferenceToTicket(preference);

  await notificationService.sendEmailRejectedNotification(ticketMapped);

  return `${process.env.FRONT_URL}/pago-rechazado`;
};
