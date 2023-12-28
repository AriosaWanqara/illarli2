import api from "@/api/axios";
import type { TransferencesApiResponse } from "../../models/ApiResponse";
import type { Transference } from "../../models/Transference";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const transferences = ref<Transference[]>([]);

const fetchTransferences = async (): Promise<Transference[]> => {
  const { data } = await api.get<TransferencesApiResponse>(
    "/accounting/transfers"
  );
  return data.data;
};

const useTransferences = () => {
  const { data, isError, isFetching, refetch } = useQuery({
    queryFn: fetchTransferences,
    queryKey: ["transferences"],
  });

  watch(data, () => {
    if (data.value) {
      transferences.value = data.value;
    }
  });

  return {
    transferences,
    transferencesHasError: isError,
    isTransferencesLoading: isFetching,
    transferencesRefetch: refetch,
  };
};

export default useTransferences;
