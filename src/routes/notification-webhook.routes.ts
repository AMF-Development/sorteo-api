import { paymentController } from "@/controllers/payment.controller";
import { PaymentNotification } from "@/interfaces/payment-notification.interface";
import { Router } from "express";

const notificationRouter = Router();

// POST /api/tickets - Crear un nuevo ticket
notificationRouter.post("/", (req, res) => {
  const paymentNotification:PaymentNotification = req.body;

  if (paymentNotification.type === "payment" && paymentNotification.action === "payment.created") {
    const { id: paymentId } = paymentNotification.data;
    const paymentStatus = await paymentController.checkPaymentStatus(Number(paymentId));

    if (paymentStatus.status === "approved") {

      // const updatedTransaction: Partial<TransactionSchemaType> = {
      //   status: "approved",
      //   paymentId: Number(paymentId),
      // };

      // TransactionsController.updateTransaction(
      //   paymentStatus.externalReference,
      //   updatedTransaction
      // );
      console.log("Payment approved");
    }
});

// GET /api/tickets - Obtener todos los tickets
// router.get("/", ticketController.getAllTickets);

export default notificationRouter;
