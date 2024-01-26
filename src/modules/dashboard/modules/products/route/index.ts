import type { RouteRecordRaw } from "vue-router";

export const ProductRouter: RouteRecordRaw[] = [
  {
    path: "productos",
    name: "product-list",
    meta: { permission: "list characteristics", name: "Productos" },
    component: () =>
      import("@dashboard/modules/products/views/product/ProductsListView.vue"),
  },
  {
    path: "productos/:id",
    name: "product-update",
    meta: { permission: "list characteristics", name: "Actualizar produto" },
    component: () =>
      import("@dashboard/modules/products/views/product/UpdateProduct.vue"),
  },
  {
    path: "categorias",
    name: "product-category-list",
    meta: { permission: "list characteristics", name: "Categorias" },
    component: () =>
      import("@dashboard/modules/products/views/category/CategoriesList.vue"),
  },
  {
    path: "marcas",
    name: "product-brands-list",
    meta: { permission: "list characteristics", name: "Marcas" },
    component: () =>
      import("@dashboard/modules/products/views/brand/BrandsList.vue"),
  },
  {
    path: "servicios",
    name: "product-service-list",
    meta: { permission: "list characteristics", name: "Serivicios" },
    component: () =>
      import("@dashboard/modules/products/views/services/ServiceList.vue"),
  },
  {
    path: "servicios/add",
    name: "product-service-add",
    meta: { permission: "list characteristics", name: "Crear Serivicio" },
    component: () =>
      import("@dashboard/modules/products/views/services/AddService.vue"),
  },
  {
    path: "add",
    name: "product-add",
    redirect: { name: "product-add-standar" },
    meta: { name: "Añadir Producto" },
    component: () =>
      import("@dashboard/modules/products/layouts/AddProductLayout.vue"),
    children: [
      {
        path: "estandar",
        name: "product-add-standar",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/Standar.vue"
          ),
      },
      {
        path: "sub-producto",
        name: "product-add-subproduct",
        meta: {
          permission: "list characteristics",
          name: "Añadir SubProducto",
        },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/Subproduct.vue"
          ),
      },
      {
        path: "receta",
        name: "product-add-recipe",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/Recipe.vue"
          ),
      },
      {
        path: "serie",
        name: "product-add-serie",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/Serie.vue"
          ),
      },
      {
        path: "combo",
        name: "product-add-combo",
        meta: {
          permission: "list characteristics",
          name: "Añadir Producto Combo",
        },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/Combo.vue"
          ),
      },
      {
        path: "lote",
        name: "product-add-lote",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/Lote.vue"
          ),
      },
      {
        path: "tallas-color",
        name: "product-add-size-color",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/SizeColor.vue"
          ),
      },
      {
        path: "servicio",
        name: "product-add-service",
        meta: { permission: "list characteristics" },
        component: () =>
          import(
            "@dashboard/modules/products/component/product/create/Service.vue"
          ),
      },
    ],
  },
];
