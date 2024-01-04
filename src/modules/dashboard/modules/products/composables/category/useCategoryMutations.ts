import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import { watch } from "vue";
import type { Category } from "../../models/Category";
import type { CategoryApiResponse } from "../../models/ApiResponse";

const saveCategory = async (category: Partial<Category>): Promise<Category> => {
  const { data } = await api.post<CategoryApiResponse>(
    "/inventory/categories",
    category
  );
  return data.data;
};
const updateCategory = async (
  category: Partial<Category>
): Promise<Category> => {
  const { data } = await api.patch<CategoryApiResponse>(
    `/inventory/categories/${category.id}`,
    category
  );
  return data.data;
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
