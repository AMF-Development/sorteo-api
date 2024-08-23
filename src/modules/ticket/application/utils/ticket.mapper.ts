import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import Ticket, {
  ITicketDocument,
} from "@/modules/ticket/infrastructure/entities/ticket.model";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";

export function ticketMapper(ticket: CreateTicketDto): ITicketDocument {
  const newTicket = new Ticket();
  newTicket.name = ticket.name;
  newTicket.lastName = ticket.lastName;
  newTicket.phone = ticket.phone;
  newTicket.email = ticket.email;
  newTicket.amount = 1;
  return newTicket;
}

export function fromPreferenceToTicket(
  preference: PreferenceResponse
): CreateTicketDto {
  const phone = `${preference.payer.phone.area_code}-${preference.payer.phone.number}`;
  return {
    name: preference.payer.name,
    lastName: preference.payer.surname,
    phone,
    email: preference.payer.email,
  };
}
