import type { User } from "@/modules/auth/models/User";
import ability from "./ability";

export const updateAbilities = (user: User) => {
  let permissionToAdd: string[] = [];
  user.permissions.map((permission) => {
    permissionToAdd.push(permission.name);
  });
  ability.update([
    {
      subject: "all",
      action: permissionToAdd,
    },
  ]);
};
