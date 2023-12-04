import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { CashdrawerApiResponse } from "../../models/ApiResponse";
import type { Cashdrawer } from "../../models/Cashdrawer";

const cashdrawer = ref<Cashdrawer>({} as Cashdrawer);

const fetchCashdrawers = async (id: string): Promise<Cashdrawer> => {
  const { data } = await api.get<CashdrawerApiResponse>(
    `/general/checkouts/${id}`
  );
  return data.data;
};

const useCashdrawer = (id: string) => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["cashdrawer", id],
    queryFn: () => fetchCashdrawers(id),
  });
  watch(data, () => {
    if (data.value) {
      cashdrawer.value = data.value;
    }
  });
  return {
    cashdrawer,
    cashdrawerHasError: isError,
    isCashdrawerLoading: isFetching,
  };
};

export default useCashdrawer;
