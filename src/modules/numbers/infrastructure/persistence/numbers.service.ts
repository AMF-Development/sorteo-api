import NumberLottery, { INumberDocument } from "../entities/numbers.model";

export const NumberLotteryService = {
  async assingLotteryNumbers(selectedNumbers: INumberDocument[]) {
    await Promise.all(
      selectedNumbers.map(async (number) => {
        await number.save();
      })
    );
  },
  async getAvailableNumbers(): Promise<INumberDocument[]> {
    return await NumberLottery.find({ assignedTo: null });
  },
  async getNumbersByTicket(ticketId: string): Promise<INumberDocument[]> {
    return await NumberLottery.find({ assignedTo: ticketId });
  },
};
