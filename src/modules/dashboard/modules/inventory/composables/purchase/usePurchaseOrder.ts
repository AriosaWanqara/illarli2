import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { PurchaseOrderApiResponse } from "../../models/ApiResponse";
import type { PurchaseOrder } from "../../models/PurchaseOrder";

const purchase = ref<PurchaseOrder>({} as PurchaseOrder);
const stalesPurchase = ref<PurchaseOrder>({} as PurchaseOrder);

const fetchPurchase = async (id: string): Promise<PurchaseOrder> => {
  const { data } = await api.get<PurchaseOrderApiResponse>(
    `/accounting/purchase-orders/${id}`
  );
  return data.data;
};

const usePurchaseOrder = (id: string) => {
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

export default usePurchaseOrder;
