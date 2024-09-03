import {
  sendEmailNotificationAdapter,
  SendMailOptions,
} from "@/modules/notification/infrastructure/adapter/mail-service.adapter";
import { paymentApplication } from "@/modules/payment/application/payment.application";
import { ITicketDocument } from "@/modules/ticket/application/interface/ticket.interface";
import {
  handleRejectedPayment,
  handleApprovedPayment,
  handlePendingPayment,
} from "@/modules/payment/application/utils/handle-payment-status.util";
import { PaymentStatus } from "@/modules/payment/application/enum/payment-status.enum";
import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import { NumberLotteryApplication } from "@/modules/numbers/application/numbers.application";

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
    const { email, name, lastName, purchasedNumbers } = ticket;
    const numbers = await NumberLotteryApplication.getNumbersByTicket(
      ticket._id as string
    );
    const emailOptions: SendMailOptions = {
      to: email,
      subject: "¡Tu pago ha sido confirmado!",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">¡Tu pago ha sido confirmado!</h2>
        <p>Estimado/a <strong>${name} ${lastName}</strong>,</p>
        <p>Nos complace informarte que tu pago ha sido aprobado con éxito.</p>
        <p>Tienes asignados <strong>${
          purchasedNumbers.length
        }</strong> números:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; max-width: 100%;">
          ${numbers
            .map(
              (num) => `
            <div style="display: inline-block; width: 50px; padding: 10px; margin: 5px; text-align: center; background: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
              ${num.number.trim()}
            </div>`
            )
            .join("")}
        </div>
        <p style="margin-top: 20px;">¡Gracias por confiar en nosotros y mucha suerte!</p>
        <br>
        <p style="font-size: 0.9em; color: #999;">Este es un correo generado automáticamente, por favor no responda a este mensaje.</p>
      </div>`,
    };
    await sendEmailNotificationAdapter(emailOptions);
  },
  async sendEmailPendingNotification(ticket: CreateTicketDto) {
    const { email, name, lastName } = ticket;
    const emailOptions: SendMailOptions = {
      to: email,
      subject: "¡Tu pago está pendiente!",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #FFA500;">¡Tu pago está pendiente!</h2>
        <p>Estimado/a <strong>${name} ${lastName}</strong>,</p>
        <p>Queremos informarte que tu pago está actualmente en estado pendiente.</p>
        <p>Nos pondremos en contacto contigo cuando el estado del pago cambie.</p>
        <br>
        <p>¡Gracias por confiar en nosotros!</p>
        <br>
        <p style="font-size: 0.9em; color: #999;">Este es un correo generado automáticamente, por favor no responda a este mensaje.</p>
      </div>`,
    };
    await sendEmailNotificationAdapter(emailOptions);
  },
  async sendEmailRejectedNotification(ticket: CreateTicketDto) {
    const { email, name, lastName } = ticket;
    const emailOptions: SendMailOptions = {
      to: email,
      subject: "¡Tu pago ha sido rechazado!",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; ">
        <h2 style="color: #FF0000;">¡Tu pago ha sido rechazado!</h2>
        <p>Estimado/a <strong>${name} ${lastName}</strong>,</p>
        <p>Lamentamos informarte que tu pago ha sido rechazado. Te sugerimos revisar los detalles de tu transacción o contactar a tu proveedor de servicios de pago.</p>
        <br>
        <p>¡Gracias por confiar en nosotros!</p>
        <br>
        <p style="font-size: 0.9em; color: #999;">Este es un correo generado automáticamente, por favor no responda a este mensaje.</p>
      </div>`,
    };
    await sendEmailNotificationAdapter(emailOptions);
  },
};
