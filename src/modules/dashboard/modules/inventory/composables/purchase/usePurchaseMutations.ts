import api from "@/api/axios";
import type { Purchase, PurchaseToSave } from "../../models/Purchase";
import { useMutation } from "@tanstack/vue-query";

const savePurchase = async (
  purchase: Partial<PurchaseToSave>
): Promise<any> => {
  const { data } = await api.post("/accounting/purchase-orders", purchase);
  return data;
};

const updatePurchase = async (
  purchase: Partial<PurchaseToSave>
): Promise<any> => {
  const { data } = await api.patch(
    `/accounting/purchase-orders/${purchase.id}`,
    purchase
  );
  return data;
};

const deletePurchase = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/accounting/purchase-orders/${id}`);
  return data;
};

const usePurchaseMutations = () => {
  const savePurchaseMutations = useMutation({ mutationFn: savePurchase });
  const updatePurchaseMutations = useMutation({ mutationFn: updatePurchase });
  const deletePurchaseMutations = useMutation({ mutationFn: deletePurchase });

  return {
    savePurchaseMutations,
    updatePurchaseMutations,
    deletePurchaseMutations,
  };
};

export default usePurchaseMutations;
