import { ITicketDocument } from "@/modules/ticket/application/interface/ticket.interface";
import { INumberDocument } from "../../infrastructure/entities/numbers.model";
import mongoose from "mongoose";

export function setSelectedNumbers(
  numsToAssing: number,
  availableNumbers: INumberDocument[],
  ticket: ITicketDocument
): INumberDocument[] {
  const selectedNumbers: INumberDocument[] = [];
  for (let i = 0; i < numsToAssing; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers.splice(randomIndex, 1)[0];

    randomNumber.assignedTo = ticket._id as mongoose.Types.ObjectId;

    selectedNumbers.push(randomNumber);
  }

  return selectedNumbers;
}
