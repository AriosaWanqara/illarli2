import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { RolApiResponse } from "../../models/ApiResponse";
import type { Rol, RolToSave } from "../../models/Rol";

const rol = ref<Rol>({} as Rol);
const permissions = ref<string[]>([]);

const rolToSave = ref<RolToSave>({} as RolToSave);
const fetchRol = async (id: string): Promise<Rol> => {
  const { data } = await api.get<RolApiResponse>(`/roles/${id}`);
  return data.data;
};

const useRol = (id: string) => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["rol", id],
    queryFn: () => fetchRol(id),
  });

  watch(data, () => {
    if (data.value) {
      rol.value = data.value;
      permissions.value = [];
      data.value.permissions.map((x) => {
        permissions.value.push(x.id);
      });
      rolToSave.value = {
        id: data.value.id,
        name: data.value.name,
        permissions: permissions.value,
      };
    }
  });

  return {
    rol,
    permissions,
    rolHasError: isError,
    isRolLoading: isFetching,
    rolToSave,
  };
};

export default useRol;
