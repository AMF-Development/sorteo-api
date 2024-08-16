import { CreateTicketDto } from "@/dto/create-ticket.dto";
import Ticket, { ITicketDocument } from "@/models/ticket.model";

export function ticketMapper(ticket: CreateTicketDto): ITicketDocument {
  const newTicket = new Ticket();
  newTicket.name = ticket.name;
  newTicket.lastName = ticket.lastName;
  newTicket.phone = ticket.phone;
  newTicket.email = ticket.email;
  newTicket.amount = 1;
  return newTicket;
}
