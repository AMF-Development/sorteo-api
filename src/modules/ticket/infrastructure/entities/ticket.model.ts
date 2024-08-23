import mongoose, { Document, Schema } from "mongoose";
import { ITicket } from "../../application/interface/ticket.interface";

const ticketSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export interface ITicketDocument extends ITicket, Document {}

const Ticket = mongoose.model<ITicketDocument>("Ticket", ticketSchema);

export default Ticket;
