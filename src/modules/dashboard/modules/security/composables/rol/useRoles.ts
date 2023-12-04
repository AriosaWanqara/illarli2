import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { RolesApiResponse } from "../../models/ApiResponse";
import type { Rol } from "../../models/Rol";

const roles = ref<Rol[]>([]);
const rolesDropdown = ref<Dropdown[]>([]);

const fetchRoles = async (): Promise<Rol[]> => {
  const { data } = await api.get<RolesApiResponse>("/roles");
  return data.data;
};

const useRoles = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  watch(data, () => {
    if (data.value) {
      roles.value = data.value;
      rolesDropdown.value = [];

      data.value.map((x) => {
        rolesDropdown.value.push({
          label: x.name,
          value: x.id,
        });
      });
    }
  });

  return {
    roles,
    rolesDropdown,
    rolesHasError: isError,
    isRolesLoading: isFetching,
  };
};

export default useRoles;
