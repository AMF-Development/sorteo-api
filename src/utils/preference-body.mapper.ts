import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import { v4 as uuid } from "uuid";

export function preferenceBodyMapper(
  ticket: CreateTicketDto
): PreferenceCreateData {
  const areaCode = ticket.phone.split("-")[0];
  const phone = ticket.phone.split("-")[1];
  return {
    body: {
      items: [
        {
          id: uuid(),
          title: "Ticket",
          quantity: 1,
          unit_price: 1000,
        },
      ],
      payer: {
        name: ticket.name,
        surname: ticket.lastName,
        email: ticket.email,
        phone: {
          area_code: areaCode,
          number: phone,
        },
        date_created: new Date().toISOString(),
      },
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
      },
      back_urls: {
        success:
          "https://1db7-2803-9800-98c2-6f96-312a-f5c7-7c7c-4178.ngrok-free.app/api/success", //reenvia a la pagina de gamboost con exito
        //     failure: "http://localhost:8080/failure", //reenvia a la pagina de gamboost con error
        //     pending: "http://localhost:8080/pending", //reenvia a la pagina de gamboost con pendiente
      },
      auto_return: "approved",
      notification_url: process.env.NOTIFICATION_URL,
      external_reference: uuid(),
    },
  };
}
