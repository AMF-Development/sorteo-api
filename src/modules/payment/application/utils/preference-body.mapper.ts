import { CreateTicketDto } from "@/modules/ticket/application/dto/create-ticket.dto";
import { ticketPackSelectorItem } from "@/modules/ticket/application/utils/ticket.mapper";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import { v4 as uuid } from "uuid";

export function preferenceBodyMapper(
  ticket: CreateTicketDto
): PreferenceCreateData {
  const areaCode = ticket.phone.split("-")[0];
  const phone = ticket.phone.split("-")[1];
  const fechaActual = new Date();
  const fechaConSuma = new Date(fechaActual.getTime() + 10 * 60000);
  const itemSelected = ticketPackSelectorItem(ticket.packageSelected);
  return {
    body: {
      items: [itemSelected],
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
        success: `${process.env.NOTIFICATION_URL}/api/notification/pago`,
        failure: `${process.env.NOTIFICATION_URL}/api/notification/pago`,
        pending: `${process.env.NOTIFICATION_URL}/api/notification/pago`,
      },
      auto_return: "approved",
      notification_url: `${process.env.NOTIFICATION_URL}/api/notification`,
      external_reference: uuid(),
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: fechaConSuma.toISOString(),
      expires: true,
    },
  };
}
