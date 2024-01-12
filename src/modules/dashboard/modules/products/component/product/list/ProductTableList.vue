<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useProducts from "../../../composables/product/useProducts";
import type { Product } from "../../../models/products/Product";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  product?: Product;
}

const props = defineProps<props>();
const emits = defineEmits(["product-update", "product-delete"]);

const { isProductsLoading, products, productsHasError } = useProducts();

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Precio", value: "price" },
  { text: "stock", value: "stock" },
  { text: "Tipo", value: "product_type_name" },
  { text: "Acciones", value: "actions", width: 110 },
];

const onDeleteProduct = (product: Product) => {
  emits("product-delete", product);
};
const onSelectProduct = (product: Product) => {
  emits("product-update", product);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isProductsLoading"
    :item="product"
    :items="products"
    :is-error="productsHasError"
  >
    <template #actions="{ item }">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            variant="text"
            color="black"
            @click="onSelectProduct(item)"
            :loading="isUpdateLoading"
          >
            <Icon icon="lucide:pencil" />
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Delete">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            color="error"
            variant="text"
            @click="onDeleteProduct(item)"
            :loading="isDeleteLoading"
          >
            <Icon icon="mdi:trash-can-outline" />
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </BaseTableComponent>
</template>

<style scoped></style>
