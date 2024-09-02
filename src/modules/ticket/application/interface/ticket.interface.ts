import mongoose, { Document } from "mongoose";

export interface ITicketDocument extends Document {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  purchasedNumbers: mongoose.Types.ObjectId[];
}
