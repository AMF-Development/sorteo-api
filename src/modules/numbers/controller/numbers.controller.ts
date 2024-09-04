import { NumberLotteryApplication } from "../application/numbers.application";
import { Request, Response } from "express";

export const NumberLotteryController = {
  async getAvailableNumbers(req: Request, res: Response) {
    try {
      const numbers = await NumberLotteryApplication.getAvailableNumbers();
      return res.status(200).send(numbers);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: `Failed to get available numbers: ${error.message}`,
        });
      } else {
        res.status(500).json({
          message:
            "An unknown error occurred while getting the available numbers",
        });
      }
    }
  },
  async getAvailableNumbersCount(req: Request, res: Response) {
    try {
      const count = await NumberLotteryApplication.getAvailableNumbersCount();
      return res.status(200).send({ count });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: `Failed to get available numbers count: ${error.message}`,
        });
      } else {
        res.status(500).json({
          message:
            "An unknown error occurred while getting the available numbers count",
        });
      }
    }
  },
};
