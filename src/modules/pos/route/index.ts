import type { RouteRecordRaw } from "vue-router";

export const posRoutes: RouteRecordRaw[] = [
  {
    path: "/pos",
    name: "pos-home",
    component: () => import("@pos/view/HomePos.vue"),
  },
];
