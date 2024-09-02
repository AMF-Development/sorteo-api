import mongoose from "mongoose";

export interface INumber {
  number: string;
  assignedTo?: mongoose.Types.ObjectId;
}
