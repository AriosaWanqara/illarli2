import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { ProductsApiResponse } from "../../models/ApiResponse";
import type { Product } from "../../models/products/Product";

const products = ref<Product[]>([]);
const productsDropdown = ref<Dropdown[]>([]);
const inactiveProduct = ref(0);
const activeProduct = ref(0);
const totalProduct = ref(0);

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
      activeProduct.value = 0;
      inactiveProduct.value = 0;
      totalProduct.value = 0;
      totalProduct.value = data.value.length;
      data.value.map((x) => {
        if (x.active) {
          activeProduct.value++;
        } else {
          inactiveProduct.value++;
        }
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
    activeProduct,
    inactiveProduct,
    totalProduct,
  };
};

export default useProducts;
