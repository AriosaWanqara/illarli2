import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { ProductApiResponse } from "../../models/ApiResponse";
import type { Product } from "../../models/products/Product";

const productFetched = ref<Product>({} as Product);

const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get<ProductApiResponse>(
    `/inventory/products/${id}`
  );
  return data.data;
};

const useProduct = (id: string) => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  watch(data, () => {
    if (data.value) {
      productFetched.value = data.value;
    }
  });

  return {
    productFetched,
    isProductFetchedLoading: isFetching,
    productFetchedHasError: isError,
  };
};

export default useProduct;
