import Payment, {
  IPaymentDocument,
} from "@/modules/payment/infrastructure/entities/payment.model";

export const paymentService = {
  async createPayment(payment: IPaymentDocument): Promise<IPaymentDocument> {
    try {
      return await payment.save();
    } catch (error: any) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  },
  updatePayment: async (
    externalReference: string,
    paymentUpdate: Partial<IPaymentDocument>
  ): Promise<IPaymentDocument> => {
    try {
      return (await Payment.findOneAndUpdate(
        { externalReference },
        paymentUpdate,
        { new: true }
      )) as IPaymentDocument;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getPaymentByPaymentId: async (
    paymentId: number
  ): Promise<IPaymentDocument | null> => {
    try {
      return await Payment.findOne({
        paymentId,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getPaymentByExternalReference: async (
    externalReference: string
  ): Promise<IPaymentDocument | null> => {
    try {
      return await Payment.findOne({
        externalReference,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
