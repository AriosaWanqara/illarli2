import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { PermissionsApiResponse } from "../../models/ApiResponse";
import type { Permission } from "../../models/Permission";

const permissions = ref<Permission[]>([]);
const permissionDropdown = ref<Dropdown[]>([]);

const fetchPermissions = async (): Promise<Permission[]> => {
  const { data } = await api.get<PermissionsApiResponse>("/permissions");
  return data.data;
};

const usePermissions = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["permissions"],
    queryFn: fetchPermissions,
  });

  watch(data, () => {
    if (data.value) {
      permissions.value = data.value;
      permissionDropdown.value = [];
      data.value.map((x) => {
        permissionDropdown.value.push({
          label: x.display_name + " " + x.module_name,
          value: x.id,
        });
      });
    }
  });

  return {
    permissions,
    permissionDropdown,
    permissionsHasError: isError,
    isPermissionsLoading: isFetching,
  };
};

export default usePermissions;
