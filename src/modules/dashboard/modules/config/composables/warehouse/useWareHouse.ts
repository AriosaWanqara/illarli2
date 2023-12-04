import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { WhareHouseApiResponse } from "../../models/ApiResponse";
import type { WareHouse } from "../../models/WareHouse";

const wareHouse = ref<WareHouse>({} as WareHouse);

const fetchWareHouses = async (id: string): Promise<WareHouse> => {
  const { data } = await api.get<WhareHouseApiResponse>(
    `/general/warehouses/${id}`
  );
  return data.data;
};

const useWareHouse = (id: string) => {
  const { isError, isFetching, error, data } = useQuery({
    queryKey: ["wharehouse", id],
    queryFn: () => fetchWareHouses(id),
  });

  watch(data, () => {
    if (data.value) {
      wareHouse.value = data.value;
    }
  });

  return {
    wareHouse,
    wareHouseHasError: isError,
    isWareHouseLoading: isFetching,
    wareHouseError: error,
  };
};

export default useWareHouse;
