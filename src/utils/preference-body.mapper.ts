import { CreateTicketDto } from "@/dto/create-ticket.dto";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import { v4 as uuid } from "uuid";

export function preferenceBodyMapper(
  ticket: CreateTicketDto
): PreferenceCreateData {
  const areaCode = ticket.phone.split("-")[0];
  const phone = ticket.phone.split("-")[1];
  const fechaActual = new Date();
  const fechaConSuma = new Date(fechaActual.getTime() + 10 * 60000);
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
          "https://7fb4-2803-9800-98c2-6f96-61b5-7837-d68d-c0fd.ngrok-free.app/api/notification/pago/success",
        failure:
          "https://7fb4-2803-9800-98c2-6f96-61b5-7837-d68d-c0fd.ngrok-free.app/api/notification/pago/failure",
        pending:
          "https://7fb4-2803-9800-98c2-6f96-61b5-7837-d68d-c0fd.ngrok-free.app/api/notification/pago/pending",
      },
      auto_return: "approved",
      notification_url: process.env.NOTIFICATION_URL,
      external_reference: uuid(),
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: fechaConSuma.toISOString(),
      expires: true,
    },
  };
}
