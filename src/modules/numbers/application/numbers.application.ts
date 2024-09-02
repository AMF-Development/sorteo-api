import { ITicketDocument } from "@/modules/ticket/application/interface/ticket.interface";
import { NumberLotteryService } from "../infrastructure/persistence/numbers.service";
import { setSelectedNumbers } from "./utils/numbers.utils";
import { INumberDocument } from "../infrastructure/entities/numbers.model";

export const NumberLotteryApplication = {
  async assignRandomNumbersToTicket(
    ticket: ITicketDocument,
    numsToAssing: number
  ): Promise<INumberDocument[]> {
    const availableNumbers = await NumberLotteryService.getAvailableNumbers();
    if (
      availableNumbers.length === 0 ||
      availableNumbers.length < numsToAssing
    ) {
      throw new Error("No available numbers");
    }
    const selectedNumbers = setSelectedNumbers(
      numsToAssing,
      availableNumbers,
      ticket
    );
    await NumberLotteryService.assingLotteryNumbers(selectedNumbers);

    return selectedNumbers;
  },
  async getAvailableNumbers() {
    return await NumberLotteryService.getAvailableNumbers();
  },
};
