import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type {
  PurchaseOrder,
  PurchaseOrderToSave,
} from "../../models/PurchaseOrder";
import type { PurchaseOrderApiResponse } from "../../models/ApiResponse";

const savePurchase = async (
  purchase: Partial<PurchaseOrderToSave>
): Promise<any> => {
  const { data } = await api.post("/accounting/purchase-orders", purchase);
  return data;
};

const updatePurchase = async (
  purchase: Partial<PurchaseOrderToSave>
): Promise<PurchaseOrder> => {
  const { data } = await api.patch<PurchaseOrderApiResponse>(
    `/accounting/purchase-orders/${purchase.id}`,
    purchase
  );
  return data.data;
};

const deletePurchase = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/accounting/purchase-orders/${id}`);
  return data;
};

const usePurchaseOrderMutations = () => {
  const savePurchaseMutations = useMutation({ mutationFn: savePurchase });
  const updatePurchaseMutations = useMutation({ mutationFn: updatePurchase });
  const deletePurchaseMutations = useMutation({ mutationFn: deletePurchase });

  return {
    savePurchaseMutations,
    updatePurchaseMutations,
    deletePurchaseMutations,
  };
};

export default usePurchaseOrderMutations;
