import type { LoginApiResponse } from "@auth/models/ApiResponse";
import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";

const signIn = async (user: {
  email: string;
  password: string;
}): Promise<LoginApiResponse> => {
  const { data } = await api.post<LoginApiResponse>("/auth/login", user);
  return data;
};

const useAuth = () => {
  const signInMutation = useMutation({ mutationFn: signIn });
  return {
    signInMutation,
  };
};

export default useAuth;
