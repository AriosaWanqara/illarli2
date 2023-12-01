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
    ],
  },
];
