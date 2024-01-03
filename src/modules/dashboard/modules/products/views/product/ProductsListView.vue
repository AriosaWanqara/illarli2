<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import { Icon } from "@iconify/vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import type { Header } from "vue3-easy-data-table";
import useProductMutations from "../../composables/product/useProductMutations";
import useProducts from "../../composables/product/useProducts";
import type { Product } from "../../models/products/Product";

const { isProductsLoading, products, productsHasError } = useProducts();
const { deleteProductMutation } = useProductMutations();
const search = ref("");

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Precio", value: "price" },
  { text: "stock", value: "stock" },
  { text: "Tipo", value: "product_type_name" },
  { text: "", value: "actions", width: 110 },
];

const onDeleteProduct = (product: Product) => {
  deleteProductMutation.mutate(product);
};

watch(deleteProductMutation.isError, () => {
  if (deleteProductMutation.isError.value) {
    let x = deleteProductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(deleteProductMutation.isSuccess, () => {
  if (deleteProductMutation.isSuccess.value) {
    products.value = products.value.filter(
      (x) => x.id != deleteProductMutation.variables.value?.id
    );
  }
});
</script>
<template>
  <UIScaffold>
    <template #left-action>
      <h1>asd</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'product-add' }">
        <v-btn flat color="success">Agregar</v-btn>
      </RouterLink>
    </template>
    <EasyDataTable
      :headers="headers"
      :theme-color="'#f48225'"
      :items="products"
      alternating
      class="customize-table"
    >
      <template #item-actions="item">
        <v-tooltip text="Edit">
          <template v-slot:activator="{ props }">
            <RouterLink
              :to="{ name: 'product-update', params: { id: item.id } }"
            >
              <v-btn icon flat v-bind="props" variant="text">
                <Icon icon="mdi:pencil" />
              </v-btn>
            </RouterLink>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              v-bind="props"
              variant="text"
              @click="onDeleteProduct(item)"
              :loading="deleteProductMutation.isPending.value"
            >
              <Icon icon="mdi:trash-can-outline" />
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </EasyDataTable>
  </UIScaffold>
</template>

<style scoped>
.search-w {
  max-width: 400px;
}
</style>
