import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { ProductsApiResponse } from "../../models/ApiResponse";
import type { Product } from "../../models/products/Product";

const products = ref<Product[]>([]);
const productsDropdown = ref<Dropdown[]>([]);

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<ProductsApiResponse>("/inventory/products");
  return data.data;
};

const useProducts = () => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  watch(data, () => {
    if (data.value) {
      products.value = data.value;
      productsDropdown.value = [];
      data.value.map((x) => {
        productsDropdown.value.push({
          label: x.name,
          value: x.id,
        });
      });
    }
  });

  return {
    products,
    productsDropdown,
    productsHasError: isError,
    isProductsLoading: isFetching,
  };
};

export default useProducts;
