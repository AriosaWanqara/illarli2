import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import { personRolEnum } from "../../constant/personRolEnum";
import type { ProvidersApiResponse } from "../../models/ApiResponse";
import type { Provider } from "../../models/Provider";

const providers = ref<Provider[]>([]);

const fetchProviders = async (): Promise<Provider[]> => {
  const { data } = await api.get<ProvidersApiResponse>(
    `/general/persons/${personRolEnum.CUSTOMER}`
  );
  return data.data;
};

const useProviders = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviders,
  });

  watch(data, () => {
    if (data.value) {
      providers.value = data.value;
    }
  });

  return {
    providers,
    isProvidersLoading: isFetching,
    providersHasError: isError,
  };
};

export default useProviders;
