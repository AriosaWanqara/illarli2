import api from "@/api/axios";
import type { Adjust } from "../../models/Adjust";
import type { AdjustApiResponse } from "../../models/ApiResponse";
import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";

const adjust = ref<Adjust[]>([]);

const fetchAdjust = async (): Promise<Adjust[]> => {
  const { data } = await api.get<AdjustApiResponse>(
    "/accounting/inventory-adjustments"
  );
  return data.data;
};

const useAdjust = () => {
  const { data, isError, isFetching, refetch } = useQuery({
    queryFn: fetchAdjust,
    queryKey: ["adjust"],
  });

  watch(data, () => {
    if (data.value) {
      adjust.value = data.value;
    }
  });

  return {
    adjust,
    adjustHasError: isError,
    isAdjustLoading: isFetching,
    refetchAdjust: refetch,
  };
};

export default useAdjust;
