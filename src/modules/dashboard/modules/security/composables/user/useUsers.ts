import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { UsersApiResponse } from "../../models/ApiResponse";
import type { User } from "../../models/User";

const users = ref<User[]>([]);

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<UsersApiResponse>("/users");
  return data.data;
};

const useUsers = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  watch(data, () => {
    if (data.value) {
      users.value = data.value;
    }
  });

  return {
    users,
    usersHasError: isError,
    isUserLoading: isFetching,
  };
};

export default useUsers;
