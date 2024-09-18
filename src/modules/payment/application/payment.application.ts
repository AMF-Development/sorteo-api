import { checkPaymentStatusAdapter } from "@/modules/notification/infrastructure/adapter/payment.adapter";
import { createPaymentAdapter } from "@/modules/notification/infrastructure/adapter/payment.adapter";
import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import { IPaymentDocument } from "@/modules/payment/infrastructure/entities/payment.model";
import { paymentService } from "@/modules/payment/infrastructure/persistence/payment.service";
import { paymentMapper } from "@/modules/payment/application/utils/payment.mapper";
import { preferenceBodyMapper } from "@/modules/payment/application/utils/preference-body.mapper";
import { NumberLotteryApplication } from "@/modules/numbers/application/numbers.application";
import { createPaymentErrors } from "./errors/create-payment.errors";

export const paymentApplication = {
  async createPayment(ticket: CreateTicketDto) {
    try {
      const modifiedTicket = { ...ticket, email: ticket.email.toLowerCase() };

      const availableNumbers =
        await NumberLotteryApplication.getAvailableNumbers();

      if (availableNumbers.length < modifiedTicket.packageSelected) {
        throw new Error(createPaymentErrors.notEnoughNumbers);
      }

      const preferenceBody = preferenceBodyMapper(modifiedTicket);
      const payment = await createPaymentAdapter(preferenceBody);

      if (!payment) {
        throw new Error(createPaymentErrors.failedToCreatePaymentLink);
      }

      const paymentMapped = paymentMapper(payment);

      await paymentService.createPayment(paymentMapped);

      return payment;
    } catch (error: any) {
      console.error(`Failed to create payment link: ${error.message}`);
      throw new Error(`${error.message}`);
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
