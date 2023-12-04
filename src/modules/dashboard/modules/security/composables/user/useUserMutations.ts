import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { User, userToSave } from "../../models/User";

const saveUser = async (user: Partial<userToSave>): Promise<any> => {
  const { data } = await api.post("/users", user);
  return data;
};
const updateUser = async (user: Partial<userToSave>): Promise<any> => {
  const { data } = await api.patch(`/users/${user.id}`, user);
  return data;
};
const deleteUser = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};

const useUserMutations = () => {
  const saveUserMutations = useMutation({ mutationFn: saveUser });
  const updateUserMutations = useMutation({ mutationFn: updateUser });
  const deleteUserMutations = useMutation({ mutationFn: deleteUser });

  return {
    saveUserMutations,
    updateUserMutations,
    deleteUserMutations,
  };
};

export default useUserMutations;
