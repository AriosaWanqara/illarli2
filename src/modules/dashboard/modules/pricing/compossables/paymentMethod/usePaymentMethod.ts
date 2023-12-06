import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { PaymentMethodApiResponse } from "../../models/ApiResponse";
import type { PaymentMethod } from "../../models/PaymentMethod";

const paymentMethod = ref<PaymentMethod>({} as PaymentMethod);

const fetchPaymentMethod = async (id: string): Promise<PaymentMethod> => {
  const { data } = await api.get<PaymentMethodApiResponse>(
    `/general/payment-methods/${id}`
  );
  return data.data;
};

const usePaymentMethod = (id: string) => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["payment-method", id],
    queryFn: () => fetchPaymentMethod(id),
  });

  watch(data, () => {
    if (data.value) {
      paymentMethod.value = data.value;
    }
  });

  return {
    paymentMethod,
    paymentMethodsHasError: isError,
    isPaymentMethodsLoading: isFetching,
  };
};

export default usePaymentMethod;
