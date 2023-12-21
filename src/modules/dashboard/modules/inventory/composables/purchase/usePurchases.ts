import { ref, watch } from "vue";
import type { Purchase } from "../../models/Purchase";
import api from "@/api/axios";
import type { PurchasesApiResponse } from "../../models/ApiResponse";
import { useQuery } from "@tanstack/vue-query";

const purchases = ref<Purchase[]>([]);

const fetchPurchases = async (): Promise<Purchase[]> => {
  const { data } = await api.get<PurchasesApiResponse>(
    "/accounting/purchase-orders"
  );
  return data.data;
};

const usePurchases = () => {
  const { data, isError, isFetching, refetch } = useQuery({
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
    isPurchasesLoading: isFetching,
    purchasesHasError: isError,
    refetchPurchases: refetch,
  };
};

export default usePurchases;
