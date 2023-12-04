import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { WareHouse } from "../../models/WareHouse";

const saveWareHouse = async (wareHouse: Partial<WareHouse>): Promise<any> => {
  const { data } = await api.post("/general/warehouses", wareHouse);
  return data;
};
const updateWareHouse = async (wareHouse: Partial<WareHouse>): Promise<any> => {
  const { data } = await api.patch(
    `/general/warehouses/${wareHouse.id}`,
    wareHouse
  );
  return data;
};
const deleteWareHouse = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/general/warehouses/${id}`);
  return data;
};

const useWareHousesMutations = () => {
  const saveWareHouseMutation = useMutation({ mutationFn: saveWareHouse });
  const updateWareHouseMutation = useMutation({ mutationFn: updateWareHouse });
  const deleteWareHouseMutation = useMutation({ mutationFn: deleteWareHouse });

  return {
    saveWareHouseMutation,
    updateWareHouseMutation,
    deleteWareHouseMutation,
  };
};

export default useWareHousesMutations;
