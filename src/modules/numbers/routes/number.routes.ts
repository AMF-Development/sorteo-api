import { Router } from "express";
import { NumberLotteryController } from "../controller/numbers.controller";

const numberRouter = Router();

numberRouter.get("/", NumberLotteryController.getAvailableNumbers);
numberRouter.get("/count", NumberLotteryController.getAvailableNumbersCount);

export default numberRouter;
