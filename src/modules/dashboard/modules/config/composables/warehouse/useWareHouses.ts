import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { WhareHousesApiResponse } from "../../models/ApiResponse";
import type { WareHouse } from "../../models/WareHouse";

const wareHouses = ref<WareHouse[]>([]);

const fetchWareHouses = async (): Promise<WareHouse[]> => {
  const { data } = await api.get<WhareHousesApiResponse>("/general/warehouses");
  return data.data;
};

const useWareHouses = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["wharehouses"],
    queryFn: fetchWareHouses,
  });

  watch(data, () => {
    if (data.value) {
      wareHouses.value = data.value;
    }
  });

  return {
    wareHouses,
    wareHousesHasError: isError,
    isWareHousesLoading: isFetching,
  };
};

export default useWareHouses;
