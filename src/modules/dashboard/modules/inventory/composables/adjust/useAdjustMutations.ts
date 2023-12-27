import api from "@/api/axios";
import type { Adjust } from "../../models/Adjust";
import { useMutation } from "@tanstack/vue-query";

const saveAdjust = async (adjust: Partial<Adjust>): Promise<any> => {
  const { data } = await api.post("/accounting/inventory-adjustments", adjust);
  return data;
};

const updateAdjust = async (adjust: Partial<Adjust>): Promise<any> => {
  const { data } = await api.patch(
    `/accounting/inventory-adjustments/${adjust.id}`,
    adjust
  );
  return data;
};

const useAdjustMutations = () => {
  const saveAdjustMutations = useMutation({ mutationFn: saveAdjust });
  const updateAdjustMutations = useMutation({ mutationFn: updateAdjust });
  return {
    saveAdjustMutations,
    updateAdjustMutations,
  };
};

export default useAdjustMutations;
