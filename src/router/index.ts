import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { authRoutes } from "@/modules/auth/route";
import { posRoutes } from "@/modules/pos/route";
import { dashboardRoutes } from "@/modules/dashboard/route";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
