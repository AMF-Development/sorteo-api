import axios from "axios";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";

import { headers } from "@/config/mp.headers";
import { PreferenceResponse } from "mercadopago/dist/clients//preference/commonTypes";
import { PaymentCheckStatusResponse } from "@/modules/payment/application/interfaces/payment-check-status-response.interface";

export const createPaymentAdapter = async (
  preference: PreferenceCreateData
): Promise<PreferenceResponse> => {
  try {
    const response = await axios.post(
      "https://api.mercadopago.com/checkout/preferences",
      preference.body,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to create payment link: ${error.message}`);
  }
};

export const checkPaymentStatusAdapter = async (
  paymentId: number
): Promise<PaymentCheckStatusResponse> => {
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers }
    );
    return {
      status: response.data.status,
      externalReference: response.data.external_reference,
    };
  } catch (error: any) {
    throw new Error(
      `Failed to check status for payment ${paymentId}: ${error.message}`
    );
  }
};

export const getPaymentByPaymentIdAdapter = async (
  paymentId: string
): Promise<PreferenceResponse> => {
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/checkout/preferences/${paymentId}`,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to get payment by payment id ${paymentId}: ${error.message}`
    );
  }
};
