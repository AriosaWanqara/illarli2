import { ref, watch } from "vue";
import type { PaymentMethod } from "../../models/PaymentMethod";
import api from "@/api/axios";
import type { PaymentMethodsApiResponse } from "../../models/ApiResponse";
import { useQuery } from "@tanstack/vue-query";

const paymentMethods = ref<PaymentMethod[]>([]);

const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data } = await api.get<PaymentMethodsApiResponse>(
    "/general/payment-methods"
  );
  return data.data;
};

const usePaymentMethods = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["payment-method"],
    queryFn: fetchPaymentMethods,
  });

  watch(data, () => {
    if (data.value) {
      paymentMethods.value = [...data.value];
    }
  });

  return {
    paymentMethods,
    paymentMethodsHasError: isError,
    isPaymentMethodsLoading: isFetching,
  };
};

export default usePaymentMethods;
