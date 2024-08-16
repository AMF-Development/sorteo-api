import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { ITicketDocument } from "@/models/ticket.model";
import { ticketService } from "@/services/ticket.service";
import { createPayment } from "@/utils/create-payment.utils";

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
  async createMPPayment(ticket: CreateTicketDto): Promise<any> {
    try {
      const payment = await createPayment(ticket);
      console.log(payment);
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
      return await ticketService.getTicketByEmail(email);
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
