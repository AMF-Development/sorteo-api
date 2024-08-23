import { paymentApplication } from "@/modules/payment/application/payment.application";
import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";

export const paymentController = {
  async createPayment(req: Request, res: Response) {
    try {
      const ticket = plainToClass(CreateTicketDto, req.body);
      const errors = await validate(ticket);

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const payment = await paymentApplication.createPayment(ticket);
      res.status(201).json(payment);
    } catch (error: any) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: `Failed to create payment: ${error.message}` });
      } else {
        res.status(500).json({
          message: "An unknown error occurred while creating the payment",
        });
      }
    }
  },
};
