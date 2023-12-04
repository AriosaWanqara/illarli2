import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { RolToSave } from "../../models/Rol";

const saveRol = async (rol: Partial<RolToSave>): Promise<any> => {
  const { data } = await api.post("/roles", rol);
  return data;
};

const updateRol = async (rol: Partial<RolToSave>): Promise<any> => {
  const { data } = await api.patch(`/roles/${rol.id}`, rol);
  return data;
};

const deleteRol = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/roles/${id}`);
  return data;
};

const useRolMutations = () => {
  const saveRolMutations = useMutation({ mutationFn: saveRol });
  const updateRolMutations = useMutation({ mutationFn: updateRol });
  const deleteRolMutations = useMutation({ mutationFn: deleteRol });

  return {
    saveRolMutations,
    updateRolMutations,
    deleteRolMutations,
  };
};

export default useRolMutations;
