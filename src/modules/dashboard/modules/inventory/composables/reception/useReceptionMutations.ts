import api from "@/api/axios";
import type { PurchaseOrderReception } from "../../models/PurchaseOrderReception";
import { useMutation } from "@tanstack/vue-query";

const saveReception = async (
  reception: Partial<PurchaseOrderReception>
): Promise<any> => {
  const { data } = await api.post("/accounting/partial-orders", reception);
  return data;
};

const deleteReception = async (id: string): Promise<any> => {
  const { data } = await api.put(`/accounting/partial-orders/${id}`);
  return data;
};

const useReceptionMutations = () => {
  const saveReceptionMutations = useMutation({ mutationFn: saveReception });
  const deleteReceptionMutations = useMutation({ mutationFn: deleteReception });

  return {
    saveReceptionMutations,
    deleteReceptionMutations,
  };
};

export default useReceptionMutations;
