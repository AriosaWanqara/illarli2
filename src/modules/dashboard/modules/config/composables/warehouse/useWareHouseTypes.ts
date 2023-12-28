import api from "@/api/axios";
import type { WareHouseTypesApiResponse } from "../../models/ApiResponse";
import type { WareHouseType } from "../../models/WareHouseType";
import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";

const wareHouseTypes = ref<WareHouseType[]>([]);

const fetchWareHouseTypes = async (): Promise<WareHouseType[]> => {
  const { data } = await api.get<WareHouseTypesApiResponse>(
    "/general/warehouse-types"
  );
  return data.data;
};

const useWareHouseTypes = () => {
  const { data, isError, isFetching } = useQuery({
    queryFn: fetchWareHouseTypes,
    queryKey: ["warehouse-types"],
  });

  watch(data, () => {
    if (data.value) {
      wareHouseTypes.value = data.value;
    }
  });

  return {
    wareHouseTypes,
    wareHouseTypesHasError: isError,
    isWareHouseTypesLoading: isFetching,
  };
};

export default useWareHouseTypes;
