import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { ClientsApiResponse } from "../../models/ApiResponse";
import type { Client } from "../../models/Client";

const clients = ref<Client[]>([]);

const fetchClients = async (): Promise<Client[]> => {
  const { data } = await api.get<ClientsApiResponse>("");
  return data.data;
};

const useClients = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  watch(data, () => {
    if (data.value) {
      clients.value = data.value;
    }
  });

  return {
    clients,
    clientsHasError: isError,
    isClientsLoading: isFetching,
  };
};

export default useClients;
