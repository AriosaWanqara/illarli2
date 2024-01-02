import ability from "@/service/ability";
import { updateAbilities } from "@/service/updateAbilities";
import { useUserStore } from "@/stores/userStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const hasPermissions = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { user } = useUserStore();
  if (to.meta.permission) {
    let permission = to.meta.permission as string;
    if (ability.rules.length) {
      check(next, permission);
    } else {
      if (user.permissions.length > 0) {
        updateAbilities(user);
        check(next, permission);
      } else {
        next({ name: "auth-login" });
      }
    }
  }
};

function check(next: NavigationGuardNext, permission: string) {
  const { logout } = useUserStore();
  if (ability.can(permission, "all")) {
    logout();
    next();
  } else {
    next({ name: "auth-login" });
  }
}
