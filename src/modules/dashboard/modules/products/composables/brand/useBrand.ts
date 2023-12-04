import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { BrandApiResponse } from "../../models/ApiResponse";
import type { Brand } from "../../models/Brand";

const brand = ref<Brand>({} as Brand);

const fetchBrands = async (id: string): Promise<Brand> => {
  const { data } = await api.get<BrandApiResponse>(`/inventory/brands/${id}`);
  return data.data;
};

const useBrand = (id: string) => {
  const { isError, isFetching, error, data } = useQuery({
    queryKey: ["products-brand", id],
    queryFn: () => fetchBrands(id),
  });

  watch(data, () => {
    if (data.value) {
      brand.value = data.value;
    }
  });

  return {
    brand,
    brandHasError: isError,
    isBrandLoading: isFetching,
    brandError: error,
  };
};

export default useBrand;
