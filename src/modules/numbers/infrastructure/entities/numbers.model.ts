import mongoose, { Document, Schema } from "mongoose";
import { INumber } from "../../application/interface/numbers.interface";

export const NumberLotterySchema: Schema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export interface INumberDocument extends INumber, Document {}

const NumberLottery = mongoose.model<INumberDocument>(
  "NumberLottery",
  NumberLotterySchema
);

export default NumberLottery;
