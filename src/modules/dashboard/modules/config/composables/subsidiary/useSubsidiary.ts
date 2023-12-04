import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { SubsidiaryApiResponse } from "../../models/ApiResponse";
import type { Subsidiary } from "../../models/Subsidiary";

const subsidiary = ref<Subsidiary>({} as Subsidiary);

const fetchSubsidiary = async (id: string): Promise<Subsidiary> => {
  const { data } = await api.get<SubsidiaryApiResponse>(
    `/general/subsidiaries/${id}`
  );
  return data.data;
};

const useSubsidiary = (id: string) => {
  const { isError, isFetching, error, data } = useQuery({
    queryKey: ["subsidiary", id],
    queryFn: () => fetchSubsidiary(id),
  });

  watch(data, () => {
    if (data.value) {
      subsidiary.value = data.value;
    }
  });

  return {
    subsidiary,
    isSubsidiaryLoading: isFetching,
    subsidiaryHasError: isError,
    subsidiaryError: error,
  };
};

export default useSubsidiary;
