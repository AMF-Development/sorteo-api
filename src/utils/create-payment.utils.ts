import { createPaymentAdapter } from "@/adapters/ticket.adapter";
import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import { v4 as uuid } from "uuid";
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

// export const checkPaymentStatus = async (paymentId: number) => {
//   try {
//     return await checkPaymentStatusAdapter(paymentId);
//   } catch (error: any) {
//     logToFile(
//       `Failed to check status for payment ${paymentId}: ${error.message}`
//     );
//     throw new Error(
//       `Failed to check status for payment ${paymentId}: ${error.message}`
//     );
//   }
// };
