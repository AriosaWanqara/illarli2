import api from "@/api/axios";
import type {
  PurchaseToSave,
  PurchaseToSave2,
} from "../../models/PurchaseOrder";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";

const savePurchase = async (purchase: PurchaseToSave): Promise<any> => {
  const { data } = await api.post("/accounting/purchases", purchase);
  return data;
};

const savePurchaseE = async (purchase: PurchaseToSave2): Promise<any> => {
  const { data } = await axios.post("", purchase);
  return data;
};

const usePurchaseMutations = () => {
  const savePurchaseMutations = useMutation({ mutationFn: savePurchase });
  const savePurchaseEMutations = useMutation({ mutationFn: savePurchaseE });

  return {
    savePurchaseMutations,
    savePurchaseEMutations,
  };
};

export default usePurchaseMutations;
