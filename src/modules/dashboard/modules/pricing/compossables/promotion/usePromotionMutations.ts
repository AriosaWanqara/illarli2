import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Promotion } from "../../models/Promotion";

const savePromotion = async (promotion: Partial<Promotion>): Promise<any> => {
  const { data } = await api.post("/inventory/discounts", promotion);
  return data;
};

const updatePromotion = async (promotion: Partial<Promotion>): Promise<any> => {
  const { data } = await api.patch(
    `/inventory/discounts/${promotion.id}`,
    promotion
  );
  return data;
};

const deletePromotion = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/inventory/discounts/${id}`);
  return data;
};

const usePromotionMutations = () => {
  const deletePromotionMutation = useMutation({ mutationFn: deletePromotion });
  const savePromotionMutation = useMutation({ mutationFn: savePromotion });
  const updatePromotionMutation = useMutation({ mutationFn: updatePromotion });

  return {
    deletePromotionMutation,
    savePromotionMutation,
    updatePromotionMutation,
  };
};

export default usePromotionMutations;
