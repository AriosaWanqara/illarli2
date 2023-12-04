import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { BrandsApiResponse } from "../../models/ApiResponse";
import type { Brand } from "../../models/Brand";

const brands = ref<Brand[]>([]);
const brandsDropdown = ref<Dropdown[]>([]);

const fetchBrands = async (): Promise<Brand[]> => {
  const { data } = await api.get<BrandsApiResponse>("/inventory/brands");
  return data.data;
};

const useBrands = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["products-brands"],
    queryFn: fetchBrands,
  });

  watch(data, () => {
    if (data.value) {
      brands.value = data.value;
      brandsDropdown.value = [];

      data.value.map((x) => {
        brandsDropdown.value.push({
          label: x.name,
          value: x.id,
        });
      });
    }
  });

  return {
    brands,
    brandsDropdown,
    brandsHasError: isError,
    isBrandsLoading: isFetching,
  };
};

export default useBrands;
