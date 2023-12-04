import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { CompanyConfigs } from "../../models/CompanyConfigs";

const updateCompanyConfigs = async (
  companyConfigs: Partial<CompanyConfigs>
): Promise<any> => {
  const { data } = await api.patch(
    `/settings/${companyConfigs.id}`,
    companyConfigs
  );
  return data;
};

const updateCompanyConfigsDomain = async (domain: {
  subDomainToVerify: string;
}): Promise<any> => {
  const { data } = await api.post(`/change-subdomain`, domain);
  return data;
};

const useCompanyConfigsMutations = () => {
  const updateCompanyConfigsMutations = useMutation({
    mutationFn: updateCompanyConfigs,
  });
  const updateCompanyConfigsDomainMutations = useMutation({
    mutationFn: updateCompanyConfigsDomain,
  });

  return {
    updateCompanyConfigsMutations,
    updateCompanyConfigsDomainMutations,
  };
};

export default useCompanyConfigsMutations;
