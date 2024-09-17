import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import { ITicketDocument } from "./interface/ticket.interface";
import { ticketService } from "@/modules/ticket/infrastructure/persistence/ticket.service";
import { NumberLotteryApplication } from "@/modules/numbers/application/numbers.application";
import mongoose from "mongoose";

export const ticketApplication = {
  async createTicket(ticket: CreateTicketDto): Promise<ITicketDocument> {
    try {
      const existingTicket = await ticketService.getTicketByEmail(ticket.email);

      if (existingTicket) {
        return this.assingNumbersToTicket(
          existingTicket,
          ticket.packageSelected
        );
      }

      const ticketCreated = await ticketService.createTicket(ticket);

      return await this.assingNumbersToTicket(
        ticketCreated,
        ticket.packageSelected
      );
    } catch (error: any) {
      throw new Error(error);
    }
  },
  async updateTicket(ticket: ITicketDocument): Promise<ITicketDocument> {
    try {
      return await ticketService.updateTicket(ticket);
    } catch (error: any) {
      throw new Error(error);
    }
  },
  async getTicketByEmail(email: string): Promise<ITicketDocument | null> {
    try {
      const emailDb = await ticketService.getTicketByEmail(email);

      if (!emailDb) {
        throw new Error("Ticket not found for the given email");
      }
      return emailDb;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  async assingNumbersToTicket(
    ticket: ITicketDocument,
    numbersToAssign: number
  ): Promise<ITicketDocument> {
    try {
      const selectedNumbers =
        await NumberLotteryApplication.assignRandomNumbersToTicket(
          ticket,
          numbersToAssign
        );
      ticket.purchasedNumbers.push(
        ...selectedNumbers.map((num) => num._id as mongoose.Types.ObjectId)
      );
      return await this.updateTicket(ticket);
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
