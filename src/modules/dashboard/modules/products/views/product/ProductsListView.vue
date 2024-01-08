<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import ProductTableList from "../../component/product/list/ProductTableList.vue";
import useProductMutations from "../../composables/product/useProductMutations";
import useProducts from "../../composables/product/useProducts";
import type { Product } from "../../models/products/Product";

const { products } = useProducts();
const { deleteProductMutation } = useProductMutations();
const router = useRouter();
const showConfirmModal = ref(false);
const selectedProduct = ref<Product>({} as Product);

const onDeleteProduct = (product: Product) => {
  selectedProduct.value = product;
  showConfirmModal.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    deleteProductMutation.mutate(selectedProduct.value);
  }
  showConfirmModal.value = false;
};

const onSelectProduct = (product: Product) => {
  router.push({ name: "product-update", params: { id: product.id } });
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
  <ViewScaffold>
    <template #default>
      <div>
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-2">
          <p class="tw-font-semibold tw-text-gray-400">Todos los productos</p>
          <RouterLink :to="{ name: 'product-add' }">
            <v-btn flat color="success" prepend-icon="mdi-plus">Nuevo</v-btn>
          </RouterLink>
        </div>
        <ProductTableList
          :is-delete-loading="deleteProductMutation.isPending.value"
          :is-update-loading="false"
          @product-delete="onDeleteProduct"
          @product-update="onSelectProduct"
        />
        <ConfirmDeleteDialog
          :dialog-text="'Esta seguro que desa borrar el producto?'"
          :show-modal="showConfirmModal"
          :title="'Desea borrar'"
          @confirm-response="onConfirmReponse"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped>
.search-w {
  max-width: 400px;
}
</style>
