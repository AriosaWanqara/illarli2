import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/Login",
    name: "auth-login",
    component: () => import("@auth/view/Login.vue"),
  },
];
