import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { CompanyApiResponse } from "../../models/ApiResponse";
import type { CompanyConfigs } from "../../models/CompanyConfigs";

const companyConfigs = ref<CompanyConfigs>({} as CompanyConfigs);
const staleDomain = ref<string>();
const fethcCompanyConfigurations = async (): Promise<CompanyConfigs> => {
  const { data } = await api.get<CompanyApiResponse>("/settings");
  return data.data;
};

const useCompany = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["company-configs"],
    queryFn: fethcCompanyConfigurations,
  });

  watch(data, () => {
    if (data.value) {
      companyConfigs.value = { ...data.value };
    }
  });

  return {
    isCompanyConfigsLoading: isFetching,
    companyConfigsHasError: isError,
    companyConfigs,
    staleData: data,
    staleDomain,
  };
};

export default useCompany;
