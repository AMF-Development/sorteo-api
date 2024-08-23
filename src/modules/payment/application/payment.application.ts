import { checkPaymentStatusAdapter } from "@/modules/notification/infrastructure/adapter/payment.adapter";
import { createPaymentAdapter } from "@/modules/notification/infrastructure/adapter/payment.adapter";
import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import { IPaymentDocument } from "@/modules/payment/infrastructure/entities/payment.model";
import { paymentService } from "@/modules/payment/infrastructure/persistence/payment.service";
import { paymentMapper } from "@/modules/payment/application/utils/payment.mapper";
import { preferenceBodyMapper } from "@/modules/payment/application/utils/preference-body.mapper";

export const paymentApplication = {
  async createPayment(ticket: CreateTicketDto) {
    try {
      const preferenceBody = preferenceBodyMapper(ticket);
      const payment = await createPaymentAdapter(preferenceBody);

      if (!payment) {
        throw new Error("Failed to create payment");
      }

      const paymentMapped = paymentMapper(payment);

      await paymentService.createPayment(paymentMapped);

      return payment;
    } catch (error: any) {
      console.error(`Failed to create payment link: ${error.message}`);
      throw new Error(`Failed to create payment link: ${error.message}`);
    }
  },

  async checkPaymentStatus(paymentId: number) {
    return await checkPaymentStatusAdapter(paymentId);
  },

  async updatePayment(
    externalReference: string,
    paymentUpdate: Partial<IPaymentDocument>
  ) {
    try {
      return await paymentService.updatePayment(
        externalReference,
        paymentUpdate
      );
    } catch (error: any) {
      throw new Error(`Failed to update payment: ${error.message}`);
    }
  },

  async getPaymentByPaymentId(paymentId: number) {
    return await paymentService.getPaymentByPaymentId(paymentId);
  },

  async getPaymentByExternalReference(externalReference: string) {
    return await paymentService.getPaymentByExternalReference(
      externalReference
    );
  },
};
