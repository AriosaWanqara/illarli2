<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

import useProducts from "../../composables/product/useProducts";
import useProductMutations from "../../composables/product/useProductMutations";
import type { Product } from "../../models/products/Product";
import { watch } from "vue";
import type { AxiosError } from "axios";

const { isProductsLoading, products, productsHasError } = useProducts();
const { deleteProductMutation } = useProductMutations();
const search = ref("");
const headers = ref([
  {
    align: "start",
    key: "name",
    title: "Nombre",
  },
  { key: "price", title: "Precio" },
  { key: "stock", title: "Stock" },
  { key: "product_type_name", title: "Tipo" },
  { key: "action", title: "Acciones", sortable: false },
]);

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
  <ViewScaffold :title="'Productos'">
    <template v-slot:action>
      <RouterLink :to="{ name: 'product-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <div class="w-100 d-flex justify-space-between">
      <v-text-field
        v-model="search"
        append-inner-icon="mdi-magnify"
        label="Buscar"
        class="search-w"
      ></v-text-field>
      <div class="d-flex gap-2">
        <VBtn color="success"><VIcon>mdi-download</VIcon>Excel</VBtn>
        <VBtn color="primary"><VIcon>mdi-download</VIcon>PDF</VBtn>
      </div>
    </div>
    <v-data-table
      :items="products"
      :search="search"
      fixed-header
      :loading="isProductsLoading"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.product_type_name }}</td>
          <td>
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{ name: 'product-update', params: { id: item.id } }"
                >
                  <v-btn icon flat v-bind="props" variant="text"
                    ><PencilIcon
                      stroke-width="1.5"
                      size="20"
                      class="text-primary"
                  /></v-btn>
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
                  ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                /></v-btn>
              </template>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </ViewScaffold>
</template>

<style scoped>
.search-w {
  max-width: 400px;
}
</style>
