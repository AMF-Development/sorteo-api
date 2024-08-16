import mongoose, { Document, Schema } from "mongoose";
import { ITicket } from "@/interfaces/ticket.interface";

const ticketSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
});

export interface ITicketDocument extends ITicket, Document {}

const Ticket = mongoose.model<ITicketDocument>("Ticket", ticketSchema);

export default Ticket;
