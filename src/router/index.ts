import { authRoutes } from "@/modules/auth/route";
import { dashboardRoutes } from "@/modules/dashboard/route";
import { posRoutes } from "@/modules/pos/route";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "dashboard-home" },
    },
    ...authRoutes,
    ...posRoutes,
    ...dashboardRoutes,
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
