import type { LoginApiResponse } from "@auth/models/ApiResponse";
import type { User } from "@auth/models/User";
// import { updateAbilities } from '@/services/updateAbilities';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user-auth",
  () => {
    const token = ref<string>();
    const user = ref<User>({} as User);

    const loginStore = (loginData: LoginApiResponse) => {
      token.value = loginData.token;
      user.value = loginData.user;
      // updateAbilities(user.value);
    };

    const logout = () => {
      token.value = "";
      user.value = {} as User;
    };

    return {
      token,
      user,

      loginStore,
      logout,
    };
  },
  { persist: true }
);
