import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Provider } from "../../models/Provider";

const saveProvider = async (provider: Partial<Provider>): Promise<any> => {
  const { data } = await api.post("/general/persons", provider);
  return data;
};
const updateProvider = async (provider: Partial<Provider>): Promise<any> => {
  const { data } = await api.patch(`/general/persons/${provider.id}`, provider);
  return data;
};
const deleteProvider = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/general/persons/${id}`);
  return data;
};

const useProvidersMutations = () => {
  const saveProviderMutation = useMutation({ mutationFn: saveProvider });
  const updateProviderMutation = useMutation({ mutationFn: updateProvider });
  const deleteProviderMutation = useMutation({ mutationFn: deleteProvider });

  return {
    saveProviderMutation,
    updateProviderMutation,
    deleteProviderMutation,
  };
};

export default useProvidersMutations;
