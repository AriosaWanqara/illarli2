import ability from "./ability";

export function checkPermission(permission: string): Boolean {
  return ability.can(permission, "all");
}
