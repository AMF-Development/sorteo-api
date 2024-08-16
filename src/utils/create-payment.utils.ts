import { createPaymentAdapter } from "@/adapters/ticket.adapter";
import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import { preferenceBodyMapper } from "./preference-body.mapper";

export const createPayment = async (ticket: CreateTicketDto): Promise<any> => {
  try {
    const preferenceBody = preferenceBodyMapper(ticket);
    console.log(preferenceBody);
    return createPaymentAdapter(preferenceBody);
  } catch (error: any) {
    console.error(`Failed to create payment link: ${error.message}`);
    throw new Error(`Failed to create payment link: ${error.message}`);
  }
};
