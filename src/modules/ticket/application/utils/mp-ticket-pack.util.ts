import { categoryPack } from "@/modules/payment/application/enum/payment-pack.enum";
import { v4 as uuid } from "uuid";

export default class MPTicket {
  static PACK1 = {
    id: uuid(),
    title: "Ticket de lotería pack 1",
    quantity: 1,
    unit_price: 35000,
    category_id: categoryPack.PACK1,
  };
  static PACK2 = {
    id: uuid(),
    title: "Ticket de lotería pack 2",
    quantity: 1,
    unit_price: 60000,
    category_id: categoryPack.PACK2,
  };
  static PACK3 = {
    id: uuid(),
    title: "Ticket de lotería pack 3",
    quantity: 1,
    unit_price: 85000,
    category_id: categoryPack.PACK3,
  };
}

export const { PACK1, PACK2, PACK3 } = MPTicket;
