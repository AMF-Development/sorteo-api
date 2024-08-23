import { paymentApplication } from "@/application/payment.application";
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
};
