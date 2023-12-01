import type { RouteRecordRaw } from "vue-router";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "dashboard-layout",
    redirect: { name: "dashboard-home" },
    component: () => import("@dashboard/layouts/AppLayout.vue"),
    children: [
      {
        path: "home",
        name: "dashboard-home",
        component: () => import("@dashboard/view/Home.vue"),
      },
      {
        path: "home/1",
        name: "product-list",
        component: () => import("@dashboard/view/Home.vue"),
      },
      {
        path: "home/2",
        name: "product-category-list",
        component: () => import("@dashboard/view/Home.vue"),
      },
      {
        path: "home/3",
        name: "product-brands-list",
        component: () => import("@dashboard/view/Home.vue"),
      },
    ],
  },
];
