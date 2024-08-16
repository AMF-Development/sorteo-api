import axios from "axios";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";

import { headers } from "@/config/mp.headers";
import { PreferenceResponse } from "mercadopago/dist/clients//preference/commonTypes";

export const createPaymentAdapter = async (
  preference: PreferenceCreateData
): Promise<any> => {
  try {
    console.log(headers);
    const x = await axios.post(
      "https://api.mercadopago.com/checkout/preferences",
      preference.body,
      { headers }
    );
    console.log(x);
    return x;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create payment link: ${error.message}`);
  }
};
