import { ref, watch } from "vue";
import type { SRITaxe, SRITaxeParent } from "../../models/SRITaxe";
import api from "@/api/axios";
import type { SRITaxesApiResponse } from "../../models/ApiResponse";
import { useQuery } from "@tanstack/vue-query";

const taxes = ref<SRITaxe[]>([]);

const fetchTaxes = async (): Promise<SRITaxeParent[]> => {
  const { data } = await api.get<SRITaxesApiResponse>("/taxes");
  return data.data;
};

const useSRITaxes = () => {
  const { data, isError, isFetching } = useQuery({
    queryFn: fetchTaxes,
    queryKey: ["sri-taxes"],
  });

  watch(data, () => {
    if (data.value) {
      taxes.value = [];
      data.value.map((x) => {
        x.rates.map((y) => {
          taxes.value.push({ ...y, code: x.code, parent: x.name });
        });
      });
    }
  });

  return {
    taxes,
    isTaxesLoading: isFetching,
    taxesHasError: isError,
  };
};

export default useSRITaxes;
