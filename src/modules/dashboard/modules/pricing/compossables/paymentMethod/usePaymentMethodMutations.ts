import api from "@/api/axios";
import type { PaymentMethod } from "../../models/PaymentMethod";
import { useMutation } from "@tanstack/vue-query";
import type { PaymentMethodApiResponse } from "../../models/ApiResponse";

const savePaymentMethod = async (
  paymentMethod: Partial<PaymentMethod>
): Promise<any> => {
  const { data } = await api.post<PaymentMethodApiResponse>(
    "/general/payment-methods",
    paymentMethod
  );
  return data.data;
};
const updatePaymentMethod = async (
  paymentMethod: Partial<PaymentMethod>
): Promise<any> => {
  const { data } = await api.patch<PaymentMethodApiResponse>(
    `/general/payment-methods/${paymentMethod.id}`,
    paymentMethod
  );
  return data.data;
};
const deletePaymentMethod = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/general/payment-methods/${id}`);
  return data;
};

const usePaymentMethodMutations = () => {
  const savePaymentMethodMutations = useMutation({
    mutationFn: savePaymentMethod,
  });
  const updatePaymentMethodMutations = useMutation({
    mutationFn: updatePaymentMethod,
  });
  const deletePaymentMethodMutations = useMutation({
    mutationFn: deletePaymentMethod,
  });

  return {
    savePaymentMethodMutations,
    updatePaymentMethodMutations,
    deletePaymentMethodMutations,
  };
};

export default usePaymentMethodMutations;
