import { useUserStore } from "@/stores/userStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const isAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { token } = useUserStore();
  if (!token) {
    next({ name: "auth-login" });
  }
  next();
};
