import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Cashdrawer } from "../../models/Cashdrawer";

const saveCashdrawer = async (
  cashdrawer: Partial<Cashdrawer>
): Promise<any> => {
  const { data } = await api.post("/general/checkouts", cashdrawer);
  return data;
};
const deleteCashdrawer = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/general/checkouts/${id}`);
  return data;
};
const updateCashdrawer = async (
  cashdrawer: Partial<Cashdrawer>
): Promise<any> => {
  const { data } = await api.put(
    `/general/checkouts/${cashdrawer.id}`,
    cashdrawer
  );
  return data;
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
