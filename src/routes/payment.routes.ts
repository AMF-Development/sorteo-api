import { paymentController } from "@/controllers/payment.controller";
import { ticketController } from "../controllers/ticket.controller";
import { Router } from "express";

const paymentRouter = Router();

// POST /api/payments - Crear un nuevo payment
paymentRouter.post("/", paymentController.createPayment);

// GET /api/payments - Obtener todos los payments

export default paymentRouter;
