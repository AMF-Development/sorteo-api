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
import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";

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
  async sendEmailConfirmedNotification(ticket: ITicketDocument) {
    const { email, name, lastName, amount } = ticket;
    const emailOptions: SendMailOptions = {
      to: email,
      subject: "¡Tu pago ha sido confirmado!",
      html: `Le enviamos este correo ${name} ${lastName} para confirmar que su pago ha sido aprobado. <br> \n Usted posee ${amount} participaciones!<br> \n <br> \n ¡Gracias por confiar en nosotros y mucha suerte!`,
    };
    await sendEmailNotificationAdapter(emailOptions);
  },
  async sendEmailPendingNotification(ticket: CreateTicketDto) {
    const { email, name, lastName } = ticket;
    const emailOptions: SendMailOptions = {
      to: email,
      subject: "¡Tu pago está pendiente!",
      html: `Le enviamos este correo ${name} ${lastName} para informarle que su pago está pendiente. <br> \n <br> \n ¡Gracias por confiar en nosotros!`,
    };
    await sendEmailNotificationAdapter(emailOptions);
  },
  async sendEmailRejectedNotification(ticket: CreateTicketDto) {
    const { email, name, lastName } = ticket;
    const emailOptions: SendMailOptions = {
      to: email,
      subject: "¡Tu pago ha sido rechazado!",
      html: `Le enviamos este correo ${name} ${lastName} para informarle que su pago ha sido rechazado. <br> \n <br> \n ¡Gracias por confiar en nosotros!`,
    };
    await sendEmailNotificationAdapter(emailOptions);
  },
};
