import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Subsidiary } from "../../models/Subsidiary";

const saveSubsidiary = async (
  subsidiary: Partial<Subsidiary>
): Promise<any> => {
  const { data } = await api.post("/general/subsidiaries", subsidiary);
  return data;
};
const updateSubsidiary = async (
  subsidiary: Partial<Subsidiary>
): Promise<any> => {
  const { data } = await api.patch(
    `/general/subsidiaries/${subsidiary.id}`,
    subsidiary
  );
  return data;
};
const deleteSubsidiary = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/general/subsidiaries/${id}`);
  return data;
};

const useSubsidiariesMutations = () => {
  const saveSubsidiaryMutations = useMutation({ mutationFn: saveSubsidiary });
  const updateSubsidiaryMutations = useMutation({
    mutationFn: updateSubsidiary,
  });
  const deleteSubsidiaryMutations = useMutation({
    mutationFn: deleteSubsidiary,
  });
  return {
    saveSubsidiaryMutations,
    updateSubsidiaryMutations,
    deleteSubsidiaryMutations,
  };
};

export default useSubsidiariesMutations;
