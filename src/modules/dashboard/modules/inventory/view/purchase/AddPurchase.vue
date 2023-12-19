<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import useProducts from "../../../products/composables/product/useProducts";
import useProviders from "../../../persons/composables/provider/useProviders";
import { ref } from "vue";
import type { PurchaseToSave } from "../../models/Purchase";
import { useUserStore } from "@/stores/userStore";
import type { Product } from "../../../products/models/products/Product";
import { watch } from "vue";

const { isProductsLoading, products, productsHasError } = useProducts();
const { isProvidersLoading, providers, providersHasError } = useProviders();
const { user } = useUserStore();
const selectedProvider = ref();
const selectedProducts = ref<Product[]>([]);
const purchase = ref<PurchaseToSave>({
  user_id: user.id,
  subsidiary_id: "9ac8b6c2-0c10-4860-8f7c-038d0ba4513d",
  warehouse_id: "9ac8b6c2-1706-4d5f-827c-fc81751bc03d",
} as PurchaseToSave);

// subsi 9ac8b6c2-0c10-4860-8f7c-038d0ba4513d
// ware  9ac8b6c2-1706-4d5f-827c-fc81751bc03d

watch(selectedProducts, () => {
  console.log(selectedProducts.value);

  purchase.value.items = selectedProducts.value.length;
});

watch(selectedProvider, () => {
  console.log(selectedProvider.value);
  purchase.value.supplier = selectedProvider.value;
});
</script>

<template>
  <UIScaffold title="Compras">
    <template #left-action>
      <h1>Agregar Compras</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'purchase-list' }">
        <VBtn color="success">back</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <VRow>
        <VCol cols="12">
          <VSelect
            label="Provider"
            :items="providers"
            item-title="name"
            return-object
            v-model="selectedProvider"
            :loading="isProvidersLoading"
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            label="Products"
            :items="products"
            multiple
            return-object
            item-title="name"
            v-model="selectedProducts"
            :loading="isProductsLoading"
          />
        </VCol>
        <VCol cols="12"> </VCol>
      </VRow>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
