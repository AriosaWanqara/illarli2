import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import { watch } from "vue";
import type { Category } from "../../models/Category";

const saveCategory = async (category: Partial<Category>): Promise<Category> => {
  const { data } = await api.post("/inventory/categories", category);
  return data;
};
const updateCategory = async (
  category: Partial<Category>
): Promise<Category> => {
  const { data } = await api.patch(
    `/inventory/categories/${category.id}`,
    category
  );
  return data;
};
const deleteCategory = async (id: string): Promise<Category> => {
  const { data } = await api.delete(`/inventory/categories/${id}`);
  return data;
};

const useCategoryMutations = () => {
  const saveCategoryMutation = useMutation({ mutationFn: saveCategory });
  const deleteCategoryMutation = useMutation({ mutationFn: deleteCategory });
  const updateCategoryMutation = useMutation({ mutationFn: updateCategory });

  watch(saveCategoryMutation.isError, () => {});

  return {
    saveCategoryMutation,
    deleteCategoryMutation,
    updateCategoryMutation,
  };
};

export default useCategoryMutations;
