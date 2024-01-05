import type { RouteRecordRaw } from "vue-router";

export const ProductRouter: RouteRecordRaw[] = [
  {
    path: "productos",
    name: "product-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/products/views/product/ProductsListView.vue"),
  },
  {
    path: "productos/:id",
    name: "product-update",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/products/views/product/UpdateProduct.vue"),
  },
  {
    path: "categorias",
    name: "product-category-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/products/views/category/CategoriesList.vue"),
  },
  {
    path: "marcas",
    name: "product-brands-list",
    meta: { permission: "list characteristics" },
    component: () =>
      import("@dashboard/modules/products/views/brand/BrandsList.vue"),
  },
  {
    path: "add",
    name: "product-add",
    redirect: { name: "product-add-standar" },
    component: () =>
      import("@dashboard/modules/products/layouts/AddProductLayout.vue"),
    children: [
      {
        path: "estandar",
        name: "product-add-standar",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/Standar.vue"),
      },
      {
        path: "sub-producto",
        name: "product-add-subproduct",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/Subproduct.vue"),
      },
      {
        path: "receta",
        name: "product-add-recipe",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/Recipe.vue"),
      },
      {
        path: "serie",
        name: "product-add-serie",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/Serie.vue"),
      },
      {
        path: "combo",
        name: "product-add-combo",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/Combo.vue"),
      },
      {
        path: "lote",
        name: "product-add-lote",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/Lote.vue"),
      },
      {
        path: "tallas-color",
        name: "product-add-size-color",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/SizeColor.vue"),
      },
      {
        path: "servicio",
        name: "product-add-service",
        meta: { permission: "list characteristics" },
        component: () =>
          import("@dashboard/modules/products/component/create/Service.vue"),
      },
    ],
  },
];
