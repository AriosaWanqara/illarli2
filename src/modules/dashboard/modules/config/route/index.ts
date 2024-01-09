import type { RouteRecordRaw } from "vue-router";

export const configRouter: RouteRecordRaw[] = [
  {
    path: "cajas",
    name: "config-cashdrawer-list",
    meta: { permission: "list characteristics", name: "Cajas" },
    component: () =>
      import("@dashboard/modules/config/view/Cashdrawer/CashdrawerList.vue"),
  },
  {
    path: "sucursales",
    name: "config-subsidiaries-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/subsidiary/SubsidiariesList.vue"),
  },
  {
    path: "sucursales/:id",
    name: "config-subsidiary-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/subsidiary/UpdateSubsidiary.vue"),
  },
  {
    path: "sucursales/add",
    name: "config-subsidiary-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/subsidiary/AddSubsidiary.vue"),
  },
  {
    path: "bodegas",
    name: "config-warehouses-list",
    meta: { permission: "list characteristics", name: "Mis Bodegas" },
    component: () =>
      import("@dashboard/modules/config/view/warehouse/WareHousesList.vue"),
  },
  {
    path: "bodegas/:id",
    name: "config-warehouses-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/warehouse/UpdateWareHouse.vue"),
  },
  {
    path: "bodega/add",
    name: "config-warehouses-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/warehouse/AddWareHouse.vue"),
  },
  {
    path: "empresa",
    name: "config-company-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/company/CompanyConfig.vue"),
  },
  {
    path: "empresa/datos",
    name: "config-company-account",
    meta: { permission: "list characteristics", name: "Mis Datos" },
    component: () =>
      import("@dashboard/modules/config/view/company/CompanyAccount.vue"),
  },
];
