import dotenv from "dotenv";
dotenv.config();

export const headers = {
  Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};
