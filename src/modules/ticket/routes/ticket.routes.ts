import { Router } from "express";
import { ticketController } from "../controller/ticket.controller";

const ticketRouter = Router();

ticketRouter.get("/", ticketController.getTicketByEmail);

export default ticketRouter;
