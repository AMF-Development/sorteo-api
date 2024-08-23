import {
  sendEmailNotificationAdapter,
  SendMailOptions,
} from "@/adapters/mail-service.adapter";
import { paymentApplication } from "@/application/payment.application";
import { ITicketDocument } from "@/models/ticket.model";
import {
  handleApprovedPayment,
  handlePendingPayment,
  handleRejectedPayment,
} from "@/utils/handle-payment-status.util";

export const notificationService = {
  async handlePaymentStatus(paymentId: string) {
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
          return handlePendingPayment(
            paymentId,
            paymentStatus.externalReference
          );
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
  },
  async sendEmailNotification(ticket: ITicketDocument) {
    const { email } = ticket;
    const emailOptions: SendMailOptions = {
      to: email,
      subject: "¡Tu pago ha sido confirmado!",
      html: `Le enviamos este correo ${ticket.name} ${ticket.lastName} para confirmar que su pago ha sido aprobado. <br> \n Usted posee ${ticket.amount} participaciones!<br> \n <br> \n ¡Gracias por confiar en nosotros y mucha suerte!`,
    };
    await sendEmailNotificationAdapter(emailOptions);
  },
};
