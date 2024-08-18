import {
  checkPaymentStatusAdapter,
  getPaymentByPaymentIdAdapter,
} from "@/adapters/payment.adapter";
import { paymentApplication } from "@/application/payment.application";
import { ticketApplication } from "@/application/ticket.application";
import { PaymentStatus } from "@/enum/payment-status.enum";
import { PaymentNotification } from "@/interfaces/payment-notification.interface";
import { handlePaymentStatus } from "@/utils/handle-payment-status.util";
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
      // const { preferenceId } = await paymentApplication.updatePayment(
      //   paymentStatus.externalReference,
      //   { status: PaymentStatus.APPROVED, paymentId: Number(paymentId) }
      // );

      // const preference = await getPaymentByPaymentIdAdapter(preferenceId);

      // const ticket = fromPreferenceToTicket(preference);
      // await ticketApplication.createTicket(ticket);

      res.sendStatus(200);
    } else if (paymentStatus.status === "pending") {
      await paymentApplication.updatePayment(paymentStatus.externalReference, {
        status: PaymentStatus.PENDING,
        paymentId: Number(paymentId),
      });
      res.sendStatus(500).json({ message: "Payment pending" });
    } else if (paymentStatus.status === "rejected") {
      await paymentApplication.updatePayment(paymentStatus.externalReference, {
        status: PaymentStatus.REJECTED,
        paymentId: Number(paymentId),
      });
      res.sendStatus(500).json({ message: "Payment rejected" });
    }
  }
});

notificationRouter.get("/pago/:status", async (req, res) => {
  const paymentId = req.query.payment_id;

  const redirectUrl = handlePaymentStatus(paymentId);

  res.redirect(await redirectUrl);
});

export default notificationRouter;
