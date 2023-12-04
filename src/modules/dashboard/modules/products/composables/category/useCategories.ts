import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { CategoriesApiResponse } from "../../models/ApiResponse";
import type { Category } from "../../models/Category";

const categories = ref<Category[]>([]);
const categoriesDropdown = ref<Dropdown[]>([]);

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<CategoriesApiResponse>(
    "/inventory/categories"
  );
  console.log(data);
  return data.data;
};

const useCategories = () => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["user-product-categories"],
    queryFn: fetchCategories,
  });

  watch(data, () => {
    if (data.value) {
      categories.value = data.value;
      categoriesDropdown.value = [];
      data.value.map((x) => {
        categoriesDropdown.value.push({
          label: x.name,
          value: x.id,
        });
      });
    }
  });

  return {
    categories,
    categoriesDropdown,
    categoriesHasError: isError,
    isCategoriesLoading: isFetching,
  };
};

export default useCategories;
