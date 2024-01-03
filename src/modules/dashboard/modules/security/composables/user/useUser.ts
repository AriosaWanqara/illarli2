import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { UserApiResponse } from "../../models/ApiResponse";
import type { User, userToSave } from "../../models/User";
import type { Dropdown } from "@/models/Dropdown";

const user = ref<User>({} as User);
const roles = ref<string[]>([]);
const userToSave = ref<userToSave>({} as userToSave);
const cashDrawerDropdown = ref<Dropdown[]>([]);

const fetchUser = async (id: string): Promise<User> => {
  const { data } = await api.get<UserApiResponse>(`/users/${id}`);
  return data.data;
};

const useUser = (id: string) => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });

  watch(data, () => {
    if (data.value) {
      user.value = data.value;
      roles.value = [];

      data.value.roles.map((x) => {
        roles.value.push(x.id);
      });
      let checkoutsId: string[] = [];
      let subsidiariesId: string[] = [];
      data.value.checkouts.map((x) => {
        checkoutsId.push(x.id);
      });
      data.value.subsidiaries.map((x) => {
        subsidiariesId.push(x.id);
      });
      userToSave.value = {
        ...data.value,
        roles: roles.value,
        checkoutsId: checkoutsId,
        subsidiariesId: subsidiariesId,
      };
      cashDrawerDropdown.value = [];
    }
  });

  return {
    user,
    roles,
    userHasError: isError,
    isUserLoading: isFetching,
    userToSave,
    cashDrawerDropdown,
  };
};

export default useUser;
