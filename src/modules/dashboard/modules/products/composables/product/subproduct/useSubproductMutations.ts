import type { StandarProduct } from "@dashboard/modules/products/models/products/StandarProduct";
import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";

const saveSubproduct = async (
  subproduct: Partial<StandarProduct>
): Promise<any> => {
  const { data } = await api.post("/inventory/products", subproduct);
  return data;
};

const updateSubproduct = async (
  subproduct: Partial<StandarProduct>
): Promise<any> => {
  const { data } = await api.patch(
    `/inventory/products/${subproduct.id}`,
    subproduct
  );
  return data;
};

const useStandarPoductMutations = () => {
  const saveSubproductMutation = useMutation({ mutationFn: saveSubproduct });
  const updateSubproductMutation = useMutation({
    mutationFn: updateSubproduct,
  });

  return {
    saveSubproductMutation,
    updateSubproductMutation,
  };
};

export default useStandarPoductMutations;
