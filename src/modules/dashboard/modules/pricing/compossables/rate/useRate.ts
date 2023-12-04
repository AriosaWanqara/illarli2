import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { RateApiResponse } from "../../models/ApiResponse";
import type { Rate } from "../../models/Rate";

const rate = ref<Rate>({} as Rate);

const fetchRate = async (id: string): Promise<Rate> => {
  const { data } = await api.get<RateApiResponse>(`/rates/${id}`);
  return data.data;
};

const useRate = (id: string) => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["rate", id],
    queryFn: () => fetchRate(id),
  });

  watch(data, () => {
    if (data.value) {
      rate.value = data.value;
    }
  });

  return {
    rate,
    rateHasError: isError,
    isRateLoading: isFetching,
  };
};

export default useRate;
