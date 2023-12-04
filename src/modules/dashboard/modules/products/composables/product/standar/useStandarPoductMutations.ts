import type { StandarProduct } from "@dashboard/modules/products/models/products/StandarProduct";
import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";

const saveStandarProduct = async (
  standarProduct: Partial<StandarProduct>
): Promise<any> => {
  const { data } = await api.post("/inventory/products", standarProduct);
  return data;
};

const updateStandarProduct = async (
  standarProduct: Partial<StandarProduct>
): Promise<any> => {
  const { data } = await api.patch(
    `/inventory/products/${standarProduct.id}`,
    standarProduct
  );
  return data;
};

const useStandarPoductMutations = () => {
  const saveStandarProductMutation = useMutation({
    mutationFn: saveStandarProduct,
  });
  const updateStandarProductMutation = useMutation({
    mutationFn: updateStandarProduct,
  });

  return {
    saveStandarProductMutation,
    updateStandarProductMutation,
  };
};

export default useStandarPoductMutations;
