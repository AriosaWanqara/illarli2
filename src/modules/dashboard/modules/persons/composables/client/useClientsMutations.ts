import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { Client } from "../../models/Client";

const saveClient = async (client: Partial<Client>): Promise<any> => {
  const { data } = await api.post("", client);
  return data;
};
const updateClient = async (client: Partial<Client>): Promise<any> => {
  const { data } = await api.patch(`/${client.id}`, client);
  return data;
};
const deleteClient = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/${id}`);
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
