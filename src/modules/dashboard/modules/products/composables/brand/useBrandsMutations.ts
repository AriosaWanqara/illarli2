import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Brand } from "../../models/Brand";

const saveBrand = async (brand: Partial<Brand>): Promise<any> => {
  const { data } = await api.post("/inventory/brands", brand);
  return data;
};
const updateBrand = async (brand: Partial<Brand>): Promise<any> => {
  const { data } = await api.patch(`/inventory/brands/${brand.id}`, brand);
  return data;
};
const deleteBrand = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/inventory/brands/${id}`);
  return data;
};

const useBrandsMutations = () => {
  const saveBrandMutation = useMutation({ mutationFn: saveBrand });
  const updateBrandMutation = useMutation({ mutationFn: updateBrand });
  const deleteBrandMutation = useMutation({ mutationFn: deleteBrand });
  return {
    saveBrandMutation,
    updateBrandMutation,
    deleteBrandMutation,
  };
};

export default useBrandsMutations;
