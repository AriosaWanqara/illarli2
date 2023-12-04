import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { CashdrawersApiResponse } from "../../models/ApiResponse";
import type { Cashdrawer } from "../../models/Cashdrawer";

const cashdrawers = ref<Cashdrawer[]>([]);

const fetchCashdrawers = async (): Promise<Cashdrawer[]> => {
  const { data } = await api.get<CashdrawersApiResponse>("/general/checkouts");
  return data.data;
};

const useCashdrawers = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["cashdrawers"],
    queryFn: fetchCashdrawers,
  });

  watch(data, () => {
    if (data.value) {
      cashdrawers.value = data.value;
    }
  });

  return {
    cashdrawers,
    cashdrawersHasError: isError,
    isCashdrawersLoading: isFetching,
  };
};

export default useCashdrawers;
