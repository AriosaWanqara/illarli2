import type { RouteRecordRaw } from "vue-router";
import { configRouter } from "../modules/config/route";
import { securityRoutes } from "../modules/security/route";
import { personRoutes } from "../modules/persons/route";

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
      ...configRouter,
      ...securityRoutes,
      ...personRoutes,
    ],
  },
];
