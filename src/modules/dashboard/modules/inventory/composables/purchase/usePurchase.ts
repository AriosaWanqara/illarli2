import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { isReadonly, ref, watch } from "vue";
import type { PurchaseApiResponse } from "../../models/ApiResponse";
import type { Detail, Purchase } from "../../models/Purchase";

const purchase = ref<Purchase>({} as Purchase);
const stalesPurchase = ref<Purchase>({} as Purchase);

const fetchPurchase = async (id: string): Promise<Purchase> => {
  const { data } = await api.get<PurchaseApiResponse>(
    `/accounting/purchase-orders/${id}`
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
      purchase.value = { ...data.value, details: [] };
      data.value.details?.map((x) => {
        purchase.value.details!.push({ ...x, amount: 0 });
      });
      stalesPurchase.value = { ...purchase.value };
    }
  });

  return {
    purchase,
    stalesPurchase,
    isPurchaseLoading: isFetching,
    purchaseHasError: isError,
  };
};

export default usePurchase;
