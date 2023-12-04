import { productTypeEnum } from "@dashboard/modules/products/const/productTypeEnum";
import type { ProductsApiResponse } from "@dashboard/modules/products/models/ApiResponse";
import type { Product } from "@dashboard/modules/products/models/products/Product";
import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const standarProducts = ref<Product[]>([]);
const standarProductsDropdown = ref<Dropdown[]>([]);

const fetchStandarProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<ProductsApiResponse>(
    `/inventory/products?productTypeId=${productTypeEnum.STANDAR}`
  );
  return data.data;
};

const useStandarProducts = () => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["standar-products"],
    queryFn: fetchStandarProducts,
  });

  watch(data, () => {
    if (data.value) {
      standarProducts.value = data.value;
      standarProductsDropdown.value = [];
      data.value.map((x) => {
        standarProductsDropdown.value.push({
          label: x.name,
          value: x.id,
        });
      });
    }
  });

  return {
    standarProducts,
    standarProductsDropdown,
    standarProductsHasError: isError,
    isStandarProductsLoading: isFetching,
  };
};

export default useStandarProducts;
