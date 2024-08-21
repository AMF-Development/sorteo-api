import { getPaymentByPaymentIdAdapter } from "@/adapters/payment.adapter";
import { paymentApplication } from "@/application/payment.application";
import { PaymentStatus } from "@/enum/payment-status.enum";
import { fromPreferenceToTicket } from "./ticket.mapper";
import { ticketApplication } from "@/application/ticket.application";

export const handlePaymentStatus = async (paymentId: string) => {
  try {
    const paymentStatus = await paymentApplication.checkPaymentStatus(
      Number(paymentId)
    );

    switch (paymentStatus.status) {
      case "approved":
        return handleApprovedPayment(
          paymentId,
          paymentStatus.externalReference
        );

      case "pending":
        return handlePendingPayment(paymentId, paymentStatus.externalReference);

      case "rejected":
        return handleRejectedPayment(
          paymentId,
          paymentStatus.externalReference
        );

      default:
        return `${process.env.FRONT_URL}/pago-no-confirmado`;
    }
  } catch (error) {
    console.error("Error handling payment status:", error);
    return `${process.env.FRONT_URL}/pago-no-confirmado`;
  }
};

const handleApprovedPayment = async (
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
  return `${process.env.FRONT_URL}/pago-confirmado?name=${ticket.name}&email=${ticket.email}&amount=${ticket.amount}`;
};

const handlePendingPayment = async (
  paymentId: string,
  externalReference: string
) => {
  await paymentApplication.updatePayment(externalReference, {
    status: PaymentStatus.PENDING,
    paymentId: Number(paymentId),
  });
  return `${process.env.FRONT_URL}/pago-pendiente`;
};

const handleRejectedPayment = async (
  paymentId: string,
  externalReference: string
) => {
  await paymentApplication.updatePayment(externalReference, {
    status: PaymentStatus.REJECTED,
    paymentId: Number(paymentId),
  });
  return `${process.env.FRONT_URL}/pago-rechazado`;
};
