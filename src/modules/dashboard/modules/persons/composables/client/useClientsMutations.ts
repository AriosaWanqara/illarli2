import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Provider } from "../../models/Provider";

const saveClient = async (client: Partial<Provider>): Promise<any> => {
  const { data } = await api.post("/general/persons", client);
  return data;
};
const updateClient = async (client: Partial<Provider>): Promise<any> => {
  const { data } = await api.patch(`/general/persons/${client.id}`, client);
  return data;
};
const deleteClient = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/general/persons/${id}`);
  return data;
};

const useClientsMutations = () => {
  const saveClientMutations = useMutation({ mutationFn: saveClient });
  const updateClientMutations = useMutation({ mutationFn: updateClient });
  const deleteClientMutations = useMutation({ mutationFn: deleteClient });

  return {
    saveClientMutations,
    updateClientMutations,
    deleteClientMutations,
  };
};

export default useClientsMutations;
