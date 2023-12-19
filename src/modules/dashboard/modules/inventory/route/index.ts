import type { RouteRecordRaw } from "vue-router";

export const invetoryRoutes: RouteRecordRaw[] = [
  {
    path: "/inventario",
    name: "invetory-home",
    children: [
      {
        path: "compras",
        name: "purchase-list",
        component: () =>
          import("@dashboard/modules/inventory/view/purchase/PurchaseList.vue"),
      },
      {
        path: "compras/add",
        name: "purchase-add",
        component: () =>
          import("@dashboard/modules/inventory/view/purchase/AddPurchase.vue"),
      },
      {
        path: "compras/:id",
        name: "purchase-update",
        component: () =>
          import(
            "@dashboard/modules/inventory/view/purchase/UpdatePurchase.vue"
          ),
      },
    ],
  },
];
