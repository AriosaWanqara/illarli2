import api from "@/api/axios";
import type { Product } from "../../models/products/Product";
import { useMutation } from "@tanstack/vue-query";

const updateUsers = async (products: Product[]): Promise<any> => {
  const { data } = await api.patch("/", products);
  return data;
};

const useProductActionsMutations = () => {
  const updateUsersMutations = useMutation({ mutationFn: updateUsers });
  updateUsersMutations.isPending;
  return {
    loading: updateUsersMutations.isPending,
    error: updateUsersMutations.isError,
    success: updateUsersMutations.isSuccess,
  };
};
export default useProductActionsMutations;

// 192.168.100.95
