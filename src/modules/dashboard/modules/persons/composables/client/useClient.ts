import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { ProviderApiResponse } from "../../models/ApiResponse";
import type { Provider } from "../../models/Provider";

const client = ref<Provider>({} as Provider);

const fetchClients = async (id: string): Promise<Provider> => {
  const { data } = await api.get<ProviderApiResponse>(`/general/persons/${id}`);
  return data.data;
};

const useClient = (id: string) => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["client", id],
    queryFn: () => fetchClients(id),
  });

  watch(data, () => {
    if (data.value) {
      client.value = data.value;
    }
  });

  return {
    client,
    clientHasError: isError,
    isClientLoading: isFetching,
  };
};

export default useClient;
