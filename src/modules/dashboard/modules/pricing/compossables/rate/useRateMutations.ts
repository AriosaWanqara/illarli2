import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Rate } from "../../models/Rate";
import type { RateApiResponse } from "../../models/ApiResponse";

const saveRate = async (rate: Partial<Rate>): Promise<Rate> => {
  const { data } = await api.post<RateApiResponse>("/inventory/rates", rate);
  return data.data;
};
const updateRate = async (rate: Partial<Rate>): Promise<Rate> => {
  const { data } = await api.patch<RateApiResponse>(
    `/inventory/rates/${rate.id}`,
    rate
  );
  return data.data;
};
const deleteRate = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/inventory/rates/${id}`);
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
