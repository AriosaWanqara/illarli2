import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { CategoryApiResponse } from "../../models/ApiResponse";
import type { Category } from "../../models/Category";

const category = ref<Category>({} as Category);

const fetchCategory = async (id: string): Promise<Category> => {
  const { data } = await api.get<CategoryApiResponse>(
    `/inventory/categories/${id}`
  );
  return data.data;
};

const useCategory = (id: string) => {
  const { data, isError, isFetching, error } = useQuery({
    queryKey: ["user-product-category", id],
    queryFn: () => fetchCategory(id),
  });

  watch(data, () => {
    if (data.value) {
      category.value = data.value;
    }
  });

  return {
    category,
    categoryHasError: isError,
    isCategoryLoading: isFetching,
    categoryError: error,
  };
};

export default useCategory;
