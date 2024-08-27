import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import { ITicketDocument } from "@/modules/ticket/infrastructure/entities/ticket.model";
import { ticketService } from "@/modules/ticket/infrastructure/persistence/ticket.service";

export const ticketApplication = {
  async createTicket(ticket: CreateTicketDto): Promise<ITicketDocument> {
    try {
      const existingTicket = await ticketService.getTicketByEmail(ticket.email);

      if (existingTicket) {
        return ticketService.updateTicketAmount(existingTicket);
      }

      return ticketService.createTicket(ticket);
    } catch (error: any) {
      throw new Error(error);
    }
  },
  async updateTicketAmount(ticket: ITicketDocument): Promise<ITicketDocument> {
    try {
      ticket.amount += 1;
      return await ticketService.updateTicketAmount(ticket);
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
};
