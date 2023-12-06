import api from "@/api/axios";
import type { SRITaxeParent } from "../../models/SRITaxe";
import type { SRITaxesApiResponse } from "../../models/ApiResponse";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { Dropdown } from "@/models/Dropdown";

const SRITaxesDropdown = ref<Dropdown[]>([]);

const fetchSRITaxes = async (): Promise<SRITaxeParent[]> => {
  const { data } = await api.get<SRITaxesApiResponse>("/taxes");
  return data.data;
};

const useSRITaxes = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["SRI-texes"],
    queryFn: fetchSRITaxes,
  });

  watch(data, () => {
    if (data.value) {
      SRITaxesDropdown.value = [];
      data.value.map((x) => {
        x.rates.map((y) => {
          SRITaxesDropdown.value.push({
            label: `${y.name}`,
            value: y.id,
          });
        });
      });
    }
  });

  return {
    SRITaxesDropdown,
    isSRITaxesLoading: isFetching,
    SRITaxesHasError: isError,
  };
};

export default useSRITaxes;
