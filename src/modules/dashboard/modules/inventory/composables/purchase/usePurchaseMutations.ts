import api from "@/api/axios";
import type { PurchaseToSave } from "../../models/PurchaseOrder";
import { useMutation } from "@tanstack/vue-query";

const savePurchase = async (purchase: PurchaseToSave): Promise<any> => {
  const { data } = await api.post("/accounting/purchases", purchase);
  return data;
};

const usePurchaseMutations = () => {
  const savePurchaseMutations = useMutation({ mutationFn: savePurchase });

  return {
    savePurchaseMutations,
  };
};

export default usePurchaseMutations;
