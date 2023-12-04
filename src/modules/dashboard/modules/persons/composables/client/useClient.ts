import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { ClientApiResponse } from "../../models/ApiResponse";
import type { Client } from "../../models/Client";

const client = ref<Client>({} as Client);

const fetchClients = async (id: string): Promise<Client> => {
  const { data } = await api.get<ClientApiResponse>(`/${id}`);
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
