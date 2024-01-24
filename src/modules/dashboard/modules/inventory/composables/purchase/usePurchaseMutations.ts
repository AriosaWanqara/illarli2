import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type {
  PurchaseToSave,
  PurchaseToSave2,
} from "../../models/PurchaseOrder";

const savePurchase = async (purchase: PurchaseToSave): Promise<any> => {
  const { data } = await api.post("/accounting/purchases", purchase);
  return data;
};

const savePurchaseE = async (purchase: PurchaseToSave2): Promise<any> => {
  const { data } = await api.post("/accounting/purchases", purchase);
  return data;
};

const savePurchaseFromXML = async (purchase: PurchaseToSave2): Promise<any> => {
  const { data } = await api.post("/accounting/purchases/xml", purchase);
  return data;
};

const usePurchaseMutations = () => {
  const savePurchaseMutations = useMutation({ mutationFn: savePurchase });
  const savePurchaseEMutations = useMutation({ mutationFn: savePurchaseE });
  const savePurchaseFromXMLMutations = useMutation({
    mutationFn: savePurchaseFromXML,
  });

  return {
    savePurchaseMutations,
    savePurchaseEMutations,
    savePurchaseFromXMLMutations,
  };
};

export default usePurchaseMutations;
