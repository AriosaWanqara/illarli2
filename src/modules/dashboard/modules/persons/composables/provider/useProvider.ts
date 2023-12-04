import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { ProviderApiResponse } from "../../models/ApiResponse";
import type { Provider } from "../../models/Provider";

const provider = ref<Provider>({} as Provider);

const fetchProvider = async (id: string): Promise<Provider> => {
  const { data } = await api.get<ProviderApiResponse>(`/general/persons/${id}`);
  return data.data;
};

const useProvider = (id: string) => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["provider", id],
    queryFn: () => fetchProvider(id),
  });
  watch(data, () => {
    if (data.value) {
      provider.value = data.value;
    }
  });

  return {
    provider,
    isProviderLoading: isFetching,
    providerHasError: isError,
  };
};

export default useProvider;
