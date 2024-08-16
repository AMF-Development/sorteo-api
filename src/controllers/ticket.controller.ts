import { ticketApplication } from "@/application/ticket.application";
import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";

export const ticketController = {
  createTicket: async (req: Request, res: Response) => {
    try {
      const ticketDto = plainToClass(CreateTicketDto, req.body);
      const errors = await validate(ticketDto);

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const newTicket = await ticketApplication.createTicket(ticketDto);
      res.status(201).json(newTicket);
    } catch (error: any) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: `Failed to create ticket: ${error.message}` });
      } else {
        res.status(500).json({
          message: "An unknown error occurred while creating the ticket",
        });
      }
    }
  },
};
