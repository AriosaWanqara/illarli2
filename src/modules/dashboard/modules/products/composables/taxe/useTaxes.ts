import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { TaxesApiResponse } from "../../models/ApiResponse";
import type { Taxe } from "../../models/Taxe";

const taxes = ref<Taxe[]>([]);

const fetchTaxes = async (): Promise<Taxe[]> => {
  const { data } = await api.get<TaxesApiResponse>("");
  return data.data;
};
const useTaxes = () => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["product-taxes"],
    queryFn: fetchTaxes,
  });

  watch(data, () => {
    if (data.value) {
      taxes.value = data.value;
    }
  });

  return {
    taxes,
    taxesHasError: isError,
    isTaxesLoading: isFetching,
  };
};

export default useTaxes;
