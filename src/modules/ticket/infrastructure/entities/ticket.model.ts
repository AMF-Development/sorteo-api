import mongoose, { Document, Schema } from "mongoose";
import { ITicketDocument } from "../../application/interface/ticket.interface";

const ticketSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    purchasedNumbers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NumberLottery",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model<ITicketDocument>("Ticket", ticketSchema);

export default Ticket;
