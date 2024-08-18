import { paymentController } from "@/controllers/payment.controller";
import { Router } from "express";

const paymentRouter = Router();

// POST /api/payments - Crear un nuevo payment
paymentRouter.post("/", paymentController.createPayment);

export default paymentRouter;