import type { RouteRecordRaw } from "vue-router";

export const personRoutes: RouteRecordRaw[] = [
  {
    path: "clientes",
    name: "client-list",
    meta: { permission: "list characteristics", name: "Clientes" },
    component: () =>
      import("@dashboard/modules/persons/view/client/ClientList.vue"),
  },
  {
    path: "proveedores",
    name: "provider-list",
    meta: { permission: "list characteristics", name: "Proveedores" },
    component: () =>
      import("@dashboard/modules/persons/view/provider/ProviderList.vue"),
  },
  {
    path: "persona/add",
    name: "person-add",
    meta: { permission: "list characteristics" },
    component: () => import("@dashboard/modules/persons/view/CreatePerson.vue"),
  },
];
