import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Taxe } from "../../models/Taxe";

const saveTaxe = async (taxe: Partial<Taxe>): Promise<any> => {
  const { data } = await api.post("", taxe);
  return data;
};
const updateTaxe = async (taxe: Partial<Taxe>): Promise<any> => {
  const { data } = await api.patch(`/${taxe.id}`, taxe);
  return data;
};
const deleteTaxe = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

const useTaxesMutations = () => {
  const saveTaxeMutations = useMutation({ mutationFn: saveTaxe });
  const updateTaxeMutations = useMutation({ mutationFn: updateTaxe });
  const deleteTaxeMutations = useMutation({ mutationFn: deleteTaxe });

  return {
    saveTaxeMutations,
    updateTaxeMutations,
    deleteTaxeMutations,
  };
};

export default useTaxesMutations;
