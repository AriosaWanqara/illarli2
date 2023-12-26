import { ref, watch } from "vue";
import type { PurchaseOrder } from "../../models/PurchaseOrder";
import api from "@/api/axios";
import type { PurchaseOrdersApiResponse } from "../../models/ApiResponse";
import { useQuery } from "@tanstack/vue-query";

const purchases = ref<PurchaseOrder[]>([]);

const fetchPurchases = async (): Promise<PurchaseOrder[]> => {
  const { data } = await api.get<PurchaseOrdersApiResponse>(
    "/accounting/purchase-orders"
  );
  return data.data;
};

const usePurchaseOrders = () => {
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

export default usePurchaseOrders;
