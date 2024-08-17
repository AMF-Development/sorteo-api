import { getPaymentByPaymentIdAdapter } from "@/adapters/payment.adapter";
import { paymentApplication } from "@/application/payment.application";
import { ticketApplication } from "@/application/ticket.application";
import { PaymentStatus } from "@/enum/payment-status.enum";
import { PaymentNotification } from "@/interfaces/payment-notification.interface";
import { fromPreferenceToTicket } from "@/utils/ticket.mapper";
import { Router } from "express";

const notificationRouter = Router();

notificationRouter.post("/", async (req, res) => {
  const paymentNotification: PaymentNotification = req.body;

  if (
    paymentNotification.type === "payment" &&
    paymentNotification.action === "payment.created"
  ) {
    const { id: paymentId } = paymentNotification.data;
    const paymentStatus = await paymentApplication.checkPaymentStatus(
      Number(paymentId)
    );

    if (paymentStatus.status === "approved") {
      const { preferenceId } = await paymentApplication.updatePayment(
        paymentStatus.externalReference,
        { status: PaymentStatus.APPROVED, paymentId: Number(paymentId) }
      );

      const preference = await getPaymentByPaymentIdAdapter(preferenceId);

      const ticket = fromPreferenceToTicket(preference);
      await ticketApplication.createTicket(ticket);
    }
  }
});

notificationRouter.post("/success", async (req, res) => {
  console.log("Payment success");
});

notificationRouter.post("/failure", async (req, res) => {
  console.log("Payment failure");
});

notificationRouter.post("/pending", async (req, res) => {
  console.log("Payment pending");
});

export default notificationRouter;
