import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import { personRolEnum } from "../../constant/personRolEnum";
import type { ProvidersApiResponse } from "../../models/ApiResponse";
import type { Provider } from "../../models/Provider";

const clients = ref<Provider[]>([]);

const fetchClients = async (): Promise<Provider[]> => {
  const { data } = await api.get<ProvidersApiResponse>(
    `/general/persons?role=${personRolEnum.CUSTOMER}`
  );
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
