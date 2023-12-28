import api from "@/api/axios";
import type { Transference } from "../../models/Transference";
import { useMutation } from "@tanstack/vue-query";

const saveTransference = async (
  transference: Partial<Transference>
): Promise<any> => {
  const { data } = await api.post("/accounting/transfers", transference);
  return data;
};
const updateTransference = async (
  transference: Partial<Transference>
): Promise<any> => {
  const { data } = await api.patch(
    `/accounting/transfers/${transference.id}`,
    transference
  );
  return data;
};

const useTransferenceMutations = () => {
  const saveTransferenceMutations = useMutation({
    mutationFn: saveTransference,
  });
  const updateTransferenceMutations = useMutation({
    mutationFn: updateTransference,
  });

  return {
    saveTransferenceMutations,
    updateTransferenceMutations,
  };
};

export default useTransferenceMutations;
