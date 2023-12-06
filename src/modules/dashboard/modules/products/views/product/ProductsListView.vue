<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

import useProducts from "../../composables/product/useProducts";
import useProductMutations from "../../composables/product/useProductMutations";
import type { Product } from "../../models/products/Product";
import { watch } from "vue";
import type { AxiosError } from "axios";
import type { Header } from "vue3-easy-data-table";
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import { Icon } from "@iconify/vue";

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
  <!-- <ViewScaffold :title="'Productos'">
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
  </ViewScaffold> -->
  <UIScaffold>
    <template #left-action>
      <h1>asd</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'product-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
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
