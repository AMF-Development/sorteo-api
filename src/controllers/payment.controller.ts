import { paymentApplication } from "@/application/payment.application";
import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const paymentController = {
  async createPayment(req, res) {
    try {
      const ticketDto = plainToClass(CreateTicketDto, req.body);
      const errors = await validate(ticketDto);

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const payment = await paymentApplication.createPayment(ticketDto);
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
  async checkPaymentStatus(paymentId: number) {},
};
