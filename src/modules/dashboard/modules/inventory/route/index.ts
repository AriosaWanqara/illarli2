import type { RouteRecordRaw } from "vue-router";

export const invetoryRoutes: RouteRecordRaw[] = [
  {
    path: "/inventario",
    name: "invetory-home",
    children: [
      {
        path: "transferencias",
        name: "transference-list",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/inventory/view/transference/ListTransferences.vue"
          ),
      },
      {
        path: "transferencias/add",
        name: "transference-add",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/inventory/view/transference/MakeTransference.vue"
          ),
      },
      {
        path: "transferencias/reception",
        name: "transference-reception",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/inventory/view/transference/ReceptTransference.vue"
          ),
      },
      {
        path: "adjuste",
        name: "adjust-list",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/inventory/view/adjust/AdjustList.vue"),
      },
      {
        path: "adjuste/add",
        name: "adjust-add",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/inventory/view/adjust/AddAdjust.vue"),
      },
      {
        path: "compras",
        name: "purchase-list",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/inventory/view/purchase/PurchaseList.vue"),
      },
      {
        path: "pedidos",
        name: "purchase-order-list",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/inventory/view/purchase/PurchaseOrderList.vue"
          ),
      },
      {
        path: "compras/add",
        name: "purchase-add",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/inventory/view/purchase/AddPurchase.vue"),
      },
      {
        path: "compras/:id",
        name: "purchase-update",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/inventory/view/purchase/UpdatePurchase.vue"
          ),
      },
    ],
  },
];
