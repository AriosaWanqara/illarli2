import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { SRIPaymentMethodsApiResponse } from "../../models/ApiResponse";
import type { SRIPaymentMethods } from "../../models/SRIPaymentMethods";

const SRIPaymentMethodsDropdown = ref<Dropdown[]>([]);

const fetchSRITaxes = async (): Promise<SRIPaymentMethods[]> => {
  const { data } = await api.get<SRIPaymentMethodsApiResponse>(
    "/general/sri/payment-methods"
  );
  return data.data;
};

const useSRIPaymentMethods = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["SRI-texes"],
    queryFn: fetchSRITaxes,
  });

  watch(data, () => {
    if (data.value) {
      SRIPaymentMethodsDropdown.value = [];
      data.value.map((x) => {
        SRIPaymentMethodsDropdown.value.push({
          label: `${x.name}`,
          value: x.id,
        });
      });
    }
  });

  return {
    SRIPaymentMethodsDropdown,
    isSRIPaymentMethodsLoading: isFetching,
    SRIPaymentMethodsHasError: isError,
  };
};

export default useSRIPaymentMethods;
