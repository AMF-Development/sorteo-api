import { checkPaymentStatusAdapter } from "@/adapters/payment.adapter";
import { createPaymentAdapter } from "@/adapters/payment.adapter";
import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { IPaymentDocument } from "@/models/payment.model";
import { paymentService } from "@/services/payment.service";
import { paymentMapper } from "@/utils/payment.mapper";
import { preferenceBodyMapper } from "@/utils/preference-body.mapper";

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
    try {
      return await checkPaymentStatusAdapter(paymentId);
    } catch (error: any) {
      throw new Error(
        `Failed to check status for payment ${paymentId}: ${error.message}`
      );
    }
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
};
