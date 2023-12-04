import type { RouteRecordRaw } from "vue-router";

export const personRoutes: RouteRecordRaw[] = [
  {
    path: "clientes",
    name: "client-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/persons/view/client/ClientList.vue"),
  },
  {
    path: "cliente/add",
    name: "client-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/persons/view/client/AddClient.vue"),
  },
  {
    path: "clientes/:id",
    name: "client-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/persons/view/client/UpdateClient.vue"),
  },
  {
    path: "proveedores",
    name: "provider-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/persons/view/provider/ProviderList.vue"),
  },
  {
    path: "proveedor/add",
    name: "provider-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/persons/view/provider/AddProvider.vue"),
  },
  {
    path: "proveedores/:id",
    name: "provider-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/persons/view/provider/UpdateProvider.vue"),
  },
];
