import type { RouteRecordRaw } from "vue-router";
import { configRouter } from "../modules/config/route";
import { securityRoutes } from "../modules/security/route";
import { personRoutes } from "../modules/persons/route";
import { ProductRouter } from "../modules/products/route";
import { pricingRoute } from "../modules/pricing/route";
import { invetoryRoutes } from "../modules/inventory/route";

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
      ...configRouter,
      ...securityRoutes,
      ...personRoutes,
      ...ProductRouter,
      ...pricingRoute,
      ...invetoryRoutes,
    ],
  },
];
