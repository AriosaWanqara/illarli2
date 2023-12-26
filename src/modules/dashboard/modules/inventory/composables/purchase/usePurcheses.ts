import api from "@/api/axios";
import type { PurchasesApiResponse } from "../../models/ApiResponse";
import type { Purchases } from "../../models/Purchases";
import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";

const purchases = ref<Purchases[]>([]);

const fetchPurchases = async (): Promise<Purchases[]> => {
  const { data } = await api.get<PurchasesApiResponse>("/accounting/purchases");
  return data.data;
};

const usePurcheses = () => {
  const { data, isError, isFetching } = useQuery({
    queryFn: fetchPurchases,
    queryKey: ["purchases"],
  });

  watch(data, () => {
    if (data.value) {
      purchases.value = data.value;
    }
  });

  return {
    purchases,
    purchasesHasError: isError,
    isPurchasesLoading: isFetching,
  };
};

export default usePurcheses;
