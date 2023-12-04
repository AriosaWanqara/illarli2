import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { TaxeApiResponse } from "../../models/ApiResponse";
import type { Taxe } from "../../models/Taxe";

const taxe = ref<Taxe>({} as Taxe);

const fetchTaxes = async (id: string): Promise<Taxe> => {
  const { data } = await api.get<TaxeApiResponse>("");
  return data.data;
};

const useTaxe = (id: string) => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["product-taxe", id],
    queryFn: () => fetchTaxes(id),
  });

  watch(data, () => {
    if (data.value) {
      taxe.value = data.value;
    }
  });

  return {
    taxe,
    taxeHasError: isError,
    isTaxeLoading: isFetching,
  };
};

export default useTaxe;
