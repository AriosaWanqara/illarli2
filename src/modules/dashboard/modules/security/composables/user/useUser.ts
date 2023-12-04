import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { UserApiResponse } from "../../models/ApiResponse";
import type { User } from "../../models/User";

const user = ref<User>({} as User);
const roles = ref<string[]>([]);

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
    }
  });

  return {
    user,
    roles,
    userHasError: isError,
    isUserLoading: isFetching,
  };
};

export default useUser;
