import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { RatesApiResponse } from "../../models/ApiResponse";
import type { Rate } from "../../models/Rate";

const rates = ref<Rate[]>([]);

const fetchRates = async (): Promise<Rate[]> => {
  const { data } = await api.get<RatesApiResponse>("/inventory/rates");
  return data.data;
};

const useRates = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["rates"],
    queryFn: fetchRates,
  });

  watch(data, () => {
    if (data.value) {
      rates.value = [...data.value];
    }
  });

  return {
    rates,
    isRatesLoading: isFetching,
    ratesHasErro: isError,
  };
};

export default useRates;
