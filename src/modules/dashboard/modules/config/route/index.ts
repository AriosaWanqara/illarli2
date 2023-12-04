import type { RouteRecordRaw } from "vue-router";

export const configRouter: RouteRecordRaw[] = [
  {
    path: "cajas",
    name: "config-cashdrawer-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/Cashdrawer/CashdrawerList.vue"),
  },
  {
    path: "cajas/:id",
    name: "config-cashdrawer-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/Cashdrawer/UpdateCashdrawer.vue"),
  },
  {
    path: "caja/add",
    name: "config-cashdrawer-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/Cashdrawer/AddCashdrawer.vue"),
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
    name: "config-wharehouses-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/warehouse/WhareHousesList.vue"),
  },
  {
    path: "bodegas/:id",
    name: "config-wharehouses-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/warehouse/UpdateWhareHouse.vue"),
  },
  {
    path: "bodega/add",
    name: "config-wharehouses-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/warehouse/AddWhareHouse.vue"),
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
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/config/view/company/CompanyAccount.vue"),
  },
];
