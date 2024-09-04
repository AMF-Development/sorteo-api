import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import Ticket from "@/modules/ticket/infrastructure/entities/ticket.model";
import { ticketMapper } from "@/modules/ticket/application/utils/ticket.mapper";
import { ITicketDocument } from "../../application/interface/ticket.interface";

export const ticketService = {
  async createTicket(ticket: CreateTicketDto): Promise<ITicketDocument> {
    try {
      const mappedTicket = ticketMapper(ticket);
      const savedTicket = await mappedTicket.save();
      return savedTicket;
    } catch (error: any) {
      throw new Error(`Failed to create ticket: ${error.message}`);
    }
  },
  async updateTicket(ticket: ITicketDocument): Promise<ITicketDocument> {
    try {
      return await ticket.save();
    } catch (error: any) {
      throw new Error(`Failed to update ticket amount: ${error.message}`);
    }
  },
  async getTicketByEmail(email: string): Promise<ITicketDocument | null> {
    try {
      return await Ticket.findOne({
        email,
      }).populate({
        path: "purchasedNumbers",
        select: "number",
      });
    } catch (error: any) {
      throw new Error(`Failed to get ticket by email: ${error.message}`);
    }
  },
};
