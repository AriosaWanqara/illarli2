import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { SubsidiariesApiResponse } from "../../models/ApiResponse";
import type { Subsidiary } from "../../models/Subsidiary";

const subsidiaries = ref<Subsidiary[]>([]);
const subsidiaryDropdown = ref<Dropdown[]>([]);

const fetchSubsidiaries = async (): Promise<Subsidiary[]> => {
  const { data } = await api.get<SubsidiariesApiResponse>(
    "/general/subsidiaries"
  );
  return data.data;
};

const useSubsidiaries = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: fetchSubsidiaries,
  });

  watch(data, () => {
    if (data.value) {
      subsidiaries.value = data.value;
      subsidiaryDropdown.value = [];
      data.value.map((x) => {
        subsidiaryDropdown.value.push({
          label: x.businessname,
          value: x.id,
        });
      });
    }
  });

  return {
    subsidiaries,
    subsidiaryDropdown,
    isSubsidiariesLoading: isFetching,
    subsidiariesHasError: isError,
  };
};

export default useSubsidiaries;
