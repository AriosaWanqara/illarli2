import type { RouteRecordRaw } from "vue-router";

export const pricingRoute: RouteRecordRaw[] = [
  {
    path: "tarifas",
    name: "rate-list",
    meta: { permission: "list characteristics", name: "Tarifas" },
    component: () =>
      import("@dashboard/modules/pricing/view/rate/RateList.vue"),
  },
  {
    path: "metodo-pago",
    name: "payment-method-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import(
        "@dashboard/modules/pricing/view/paymentMethod/PaymentMethodList.vue"
      ),
  },
  {
    path: "metodo-pago/add",
    name: "payment-method-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import(
        "@dashboard/modules/pricing/view/paymentMethod/AddPaymentMethod.vue"
      ),
  },
  {
    path: "metodo-pago/:id",
    name: "payment-method-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import(
        "@dashboard/modules/pricing/view/paymentMethod/UpdatePaymentMethod.vue"
      ),
  },
  {
    path: "promotions",
    name: "promotions-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/pricing/view/promotion/PromotionsList.vue"),
  },
  {
    path: "promotions/:id",
    name: "promotions-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/pricing/view/promotion/UpdatePromotion.vue"),
  },
  {
    path: "promotion/add",
    name: "promotions-add",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/pricing/view/promotion/AddPromotion.vue"),
  },
];
