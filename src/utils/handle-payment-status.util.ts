import { getPaymentByPaymentIdAdapter } from "@/adapters/payment.adapter";
import { paymentApplication } from "@/application/payment.application";
import { PaymentStatus } from "@/enum/payment-status.enum";
import { fromPreferenceToTicket } from "./ticket.mapper";
import { ticketApplication } from "@/application/ticket.application";

export const handlePaymentStatus = async (paymentId) => {
  const paymentStatus = await paymentApplication.checkPaymentStatus(
    Number(paymentId)
  );
  switch (paymentStatus.status) {
    case "approved":
      const { preferenceId } = await paymentApplication.updatePayment(
        paymentStatus.externalReference,
        { status: PaymentStatus.APPROVED, paymentId: Number(paymentId) }
      );

      const preference = await getPaymentByPaymentIdAdapter(preferenceId);

      const ticketMapped = fromPreferenceToTicket(preference);
      const ticket = await ticketApplication.createTicket(ticketMapped);
      return `${process.env.FRONT_URL}/pago-confirmado?name=${ticket.name}&email=${ticket.email}&amount=${ticket.amount}`;
    case "pending":
      await paymentApplication.updatePayment(paymentStatus.externalReference, {
        status: PaymentStatus.PENDING,
        paymentId: Number(paymentId),
      });
      return `${process.env.FRONT_URL}/pago-pendiente`;
    case "rejected":
      await paymentApplication.updatePayment(paymentStatus.externalReference, {
        status: PaymentStatus.REJECTED,
        paymentId: Number(paymentId),
      });
      return `${process.env.FRONT_URL}/pago-rechazado`;
    default:
      return `${process.env.FRONT_URL}/pago-no-confirmado`;
  }
};
