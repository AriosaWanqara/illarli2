import type { RouteRecordRaw } from "vue-router";

export const invetoryRoutes: RouteRecordRaw[] = [
  {
    path: "/inventario",
    name: "invetory-home",
    children: [
      {
        path: "adjuste",
        name: "adjust-list",
        component: () =>
          import("@dashboard/modules/inventory/view/adjust/AdjustList.vue"),
      },
      {
        path: "adjuste/add",
        name: "adjust-add",
        component: () =>
          import("@dashboard/modules/inventory/view/adjust/AddAdjust.vue"),
      },
      {
        path: "compras",
        name: "purchase-list",
        component: () =>
          import("@dashboard/modules/inventory/view/purchase/PurchaseList.vue"),
      },
      {
        path: "pedidos",
        name: "purchase-order-list",
        component: () =>
          import(
            "@dashboard/modules/inventory/view/purchase/PurchaseOrderList.vue"
          ),
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
