import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Product } from "../../models/products/Product";

const deleteProduct = async (product: Partial<Product>): Promise<any> => {
  const { data } = await api.delete(`/inventory/products/${product.id}`);
  return data;
};

const useProductMutations = () => {
  const deleteProductMutation = useMutation({ mutationFn: deleteProduct });

  return {
    deleteProductMutation,
  };
};

export default useProductMutations;
