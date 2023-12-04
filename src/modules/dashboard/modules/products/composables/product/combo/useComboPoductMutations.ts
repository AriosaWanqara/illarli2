import type { ComboProduct } from "@dashboard/modules/products/models/products/ComboProduct";
import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";

const saveComboProduct = async (
  comboProduct: Partial<ComboProduct>
): Promise<any> => {
  const { data } = await api.post("/inventory/products", comboProduct);
  return data;
};

const updateComboProduct = async (
  comboProduct: Partial<ComboProduct>
): Promise<any> => {
  const { data } = await api.patch(
    `/inventory/products/${comboProduct.id}`,
    comboProduct
  );
  return data;
};

const deleteComboProductChild = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

const useComboPoductMutations = () => {
  const saveComboProductMutation = useMutation({
    mutationFn: saveComboProduct,
  });
  const deleteComboProductChildMutation = useMutation({
    mutationFn: deleteComboProductChild,
  });
  const updateComboProductMutation = useMutation({
    mutationFn: updateComboProduct,
  });

  return {
    updateComboProductMutation,
    saveComboProductMutation,
    deleteComboProductChildMutation,
  };
};

export default useComboPoductMutations;
