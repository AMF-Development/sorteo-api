import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import Ticket from "@/modules/ticket/infrastructure/entities/ticket.model";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { ITicketDocument } from "../interface/ticket.interface";
import { categoryPack } from "@/modules/payment/application/enum/payment-pack.enum";
import { Items } from "mercadopago/dist/clients/commonTypes";
import MPTicket from "../mp-ticket-pack";

export function ticketMapper(ticket: CreateTicketDto): ITicketDocument {
  const newTicket = new Ticket();
  newTicket.name = ticket.name;
  newTicket.lastName = ticket.lastName;
  newTicket.phone = ticket.phone;
  newTicket.email = ticket.email;
  return newTicket;
}

export function fromPreferenceToTicket(
  preference: PreferenceResponse
): CreateTicketDto {
  const phone = `${preference.payer.phone.area_code}-${preference.payer.phone.number}`;
  const categoryId = preference.items[0].category_id;
  return {
    name: preference.payer.name,
    lastName: preference.payer.surname,
    phone,
    email: preference.payer.email,
    numbersPurchased: ticketPackSelector(categoryId),
  };
}

function ticketPackSelector(numbersPurchased: string): number {
  switch (numbersPurchased) {
    case categoryPack.PACK1:
      return 1;
    case categoryPack.PACK2:
      return 2;
    case categoryPack.PACK3:
      return 3;
  }
}

export function ticketPackSelectorItem(numbersPurchased: number): Items {
  switch (numbersPurchased) {
    case 1:
      return MPTicket.PACK1;
    case 2:
      return MPTicket.PACK2;
    case 3:
      return MPTicket.PACK3;
  }
}
