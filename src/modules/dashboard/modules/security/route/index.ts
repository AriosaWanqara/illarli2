import type { RouteRecordRaw } from "vue-router";

export const securityRoutes: RouteRecordRaw[] = [
  {
    path: "usuarios",
    name: "users-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/security/view/user/UsersList.vue"),
  },
  {
    path: "usuario/add",
    name: "users-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/security/view/user/AddUser.vue"),
  },
  {
    path: "usuarios/:id",
    name: "users-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/security/view/user/UpdateUser.vue"),
  },
  {
    path: "roles",
    name: "roles-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/security/view/rol/RolesList.vue"),
  },
  {
    path: "rol/add",
    name: "roles-add",
    meta: { permission: "list characteristics" },
    component: () => import("@dashboard/modules/security/view/rol/AddRol.vue"),
  },
  {
    path: "roles/:id",
    name: "roles-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/security/view/rol/UpdateRol.vue"),
  },
];
