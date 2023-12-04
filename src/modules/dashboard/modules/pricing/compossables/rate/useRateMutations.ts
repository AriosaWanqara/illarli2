import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Rate } from "../../models/Rate";

const saveRate = async (rate: Partial<Rate>): Promise<any> => {
  const { data } = await api.post("/rates", rate);
  return data;
};
const updateRate = async (rate: Partial<Rate>): Promise<any> => {
  const { data } = await api.patch(`/rates/${rate.id}`, rate);
  return data;
};
const deleteRate = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/rates/${id}`);
  return data;
};

const useRateMutations = () => {
  const saveRateMutations = useMutation({ mutationFn: saveRate });
  const updateRateMutations = useMutation({ mutationFn: updateRate });
  const deleteRateMutations = useMutation({ mutationFn: deleteRate });

  return {
    saveRateMutations,
    updateRateMutations,
    deleteRateMutations,
  };
};

export default useRateMutations;
