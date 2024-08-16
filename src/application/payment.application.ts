import { createPaymentAdapter } from "@/adapters/ticket.adapter";
import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { preferenceBodyMapper } from "@/utils/preference-body.mapper";

export const paymentApplication = {
  async createPayment(ticket: CreateTicketDto) {
    try {
      const preferenceBody = preferenceBodyMapper(ticket);
      return createPaymentAdapter(preferenceBody);
    } catch (error: any) {
      console.error(`Failed to create payment link: ${error.message}`);
      throw new Error(`Failed to create payment link: ${error.message}`);
    }
  },
  async checkPaymentStatus(paymentId:number) {
    try {
            return await checkPaymentStatusAdapter(paymentId);
          } catch (error: any) {
            logToFile(
              `Failed to check status for payment ${paymentId}: ${error.message}`
            );
            throw new Error(
              `Failed to check status for payment ${paymentId}: ${error.message}`
            );
  },
};
