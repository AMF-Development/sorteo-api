import { ticketController } from "../controllers/ticket.controller";
import { Router } from "express";

const ticketRouter = Router();

// POST /api/tickets - Crear un nuevo ticket
ticketRouter.post("/", ticketController.createTicket);

// GET /api/tickets - Obtener todos los tickets
// router.get("/", ticketController.getAllTickets);

export default ticketRouter;
