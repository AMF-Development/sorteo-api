import {
  sendEmailNotificationAdapter,
  SendMailOptions,
} from "@/modules/notification/infrastructure/adapter/mail-service.adapter";
import { paymentApplication } from "@/modules/payment/application/payment.application";
import { ITicketDocument } from "@/modules/ticket/infrastructure/entities/ticket.model";
import {
  handleRejectedPayment,
  handleApprovedPayment,
  handlePendingPayment,
} from "@/modules/payment/application/utils/handle-payment-status.util";
import { PaymentStatus } from "@/modules/payment/application/enum/payment-status.enum";

export const notificationService = {
  async handlePaymentStatus(paymentId: string) {
    try {
      const paymentStatus = await paymentApplication.checkPaymentStatus(
        Number(paymentId)
      );
      switch (paymentStatus.status) {
        case PaymentStatus.APPROVED:
          return handleApprovedPayment(
            paymentId,
            paymentStatus.externalReference
          );
        case PaymentStatus.PENDING:
          return handlePendingPayment(
            paymentId,
            paymentStatus.externalReference
          );
        case PaymentStatus.REJECTED:
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
