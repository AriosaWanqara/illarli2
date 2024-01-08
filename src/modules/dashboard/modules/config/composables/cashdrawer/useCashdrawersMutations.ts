import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Cashdrawer } from "../../models/Cashdrawer";
import type { CashdrawerApiResponse } from "../../models/ApiResponse";

const saveCashdrawer = async (
  cashdrawer: Partial<Cashdrawer>
): Promise<Cashdrawer> => {
  const { data } = await api.post<CashdrawerApiResponse>(
    "/general/checkouts",
    cashdrawer
  );
  return data.data;
};
const deleteCashdrawer = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/general/checkouts/${id}`);
  return data;
};
const updateCashdrawer = async (
  cashdrawer: Partial<Cashdrawer>
): Promise<Cashdrawer> => {
  const { data } = await api.put<CashdrawerApiResponse>(
    `/general/checkouts/${cashdrawer.id}`,
    cashdrawer
  );
  return data.data;
};

const useCashdrawersMutations = () => {
  const saveCashdrawerMutations = useMutation({ mutationFn: saveCashdrawer });
  const deleteCashdrawerMutations = useMutation({
    mutationFn: deleteCashdrawer,
  });
  const updateCashdrawerMutations = useMutation({
    mutationFn: updateCashdrawer,
  });

  return {
    saveCashdrawerMutations,
    deleteCashdrawerMutations,
    updateCashdrawerMutations,
  };
};

export default useCashdrawersMutations;
