import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { PromotionsApiResponse } from "../../models/ApiResponse";
import type { Promotion } from "../../models/Promotion";

const promotions = ref<Promotion[]>([]);

const fetchPromotions = async (): Promise<Promotion[]> => {
  const { data } = await api.get<PromotionsApiResponse>("/inventory/discounts");
  return data.data;
};

const usePromotions = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["promotions"],
    queryFn: fetchPromotions,
  });

  watch(data, () => {
    if (data.value) {
      promotions.value = data.value;
    }
  });

  return {
    promotions,
    promotionsHasError: isError,
    isPromotionsLoading: isFetching,
  };
};

export default usePromotions;
