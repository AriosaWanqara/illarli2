import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { PromotionApiResponse } from "../../models/ApiResponse";
import type { Promotion } from "../../models/Promotion";

const promotion = ref<Promotion>({} as Promotion);
const promotionToUpdate = ref<Partial<Promotion>>({} as Partial<Promotion>);

const fetchPromotion = async (id: string): Promise<Promotion> => {
  const { data } = await api.get<PromotionApiResponse>(
    `/inventory/discounts/${id}`
  );
  return data.data;
};

const usePromotion = (id: string) => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["promotion", id],
    queryFn: () => fetchPromotion(id),
  });

  watch(data, () => {
    if (data.value) {
      promotion.value = data.value;
      promotionToUpdate.value = {
        id: data.value.id,
        name: data.value.name,
        type: data.value.type,
        description: data.value.description,
      };
    }
  });

  return {
    promotion,
    promotionHasError: isError,
    isPromotionLoading: isFetching,
    promotionToUpdate,
  };
};

export default usePromotion;
