import { ref, watch } from "vue";
import type { Purchase } from "../../models/Purchase";
import api from "@/api/axios";
import type { PurchaseApiResponse } from "../../models/ApiResponse";
import { useQuery } from "@tanstack/vue-query";

const purchase = ref<Purchase>({} as Purchase);

const fetchPurchase = async (id: string): Promise<Purchase> => {
  const { data } = await api.get<PurchaseApiResponse>(
    "/accounting/purchase-orders"
  );
  return data.data;
};

const usePurchase = (id: string) => {
  const { data, isError, isFetching } = useQuery({
    queryFn: () => fetchPurchase(id),
    queryKey: ["purchase", id],
  });

  watch(data, () => {
    if (data.value) {
      purchase.value = data.value;
    }
  });

  return {
    purchase,
    isPurchaseLoading: isFetching,
    purchaseHasError: isError,
  };
};

export default usePurchase;
