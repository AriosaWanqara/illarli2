<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import { useUserStore } from "@/stores/userStore";
import { ref, watch } from "vue";
import useProviders from "../../../persons/composables/provider/useProviders";
import useProducts from "../../../products/composables/product/useProducts";
import type { Product } from "../../../products/models/products/Product";
import usePurchaseMutations from "../../composables/purchase/usePurchaseMutations";
import type { Detail, PurchaseToSave } from "../../models/Purchase";
import { useRouter } from "vue-router";
import type { AxiosError } from "axios";

const { isProductsLoading, products, productsHasError } = useProducts();
const { isProvidersLoading, providers, providersHasError } = useProviders();
const { savePurchaseMutations } = usePurchaseMutations();

const { user } = useUserStore();
const router = useRouter();
const selectedProvider = ref();
const selectedProducts = ref<Product[]>([]);
const selectedProductsNotReadOnly = ref<Product[]>([]);
const purchase = ref<PurchaseToSave>({
  user_id: user.id,
  subsidiary_id: "9ac8b6c2-0c10-4860-8f7c-038d0ba4513d",
  warehouse_id: "9ac8b6c2-1706-4d5f-827c-fc81751bc03d",
  details: [] as Detail[],
} as PurchaseToSave);

watch(selectedProducts, () => {
  purchase.value.items = selectedProducts.value.length;
  selectedProductsNotReadOnly.value = [];
  selectedProducts.value.map((x) => {
    selectedProductsNotReadOnly.value.push({ ...x, amount: 1 });
  });
});

watch(
  selectedProductsNotReadOnly,
  () => {
    purchase.value.details = [];
    selectedProductsNotReadOnly.value.map((x) => {
      purchase.value.details!.push({
        observation: "a",
        product: x,
        order_amount: x.amount,
        unit_price: parseFloat(x.price),
      });
    });
  },
  { deep: true }
);

watch(selectedProvider, () => {
  purchase.value.supplier = selectedProvider.value;
});

const onPurchaseSubmit = () => {
  savePurchaseMutations.mutate(purchase.value);
};

watch(savePurchaseMutations.isError, () => {
  if (savePurchaseMutations.isError.value) {
    let x = savePurchaseMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(savePurchaseMutations.isSuccess, () => {
  if (savePurchaseMutations.isSuccess.value) {
    router.push({ name: "purchase-list" });
  }
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
        <VCol cols="6">
          <VSelect
            label="Provider"
            :items="providers"
            item-title="name"
            return-object
            v-model="selectedProvider"
            :loading="isProvidersLoading"
          />
        </VCol>
        <VCol cols="6">
          <VSelect
            label="Products"
            :items="products"
            item-title="name"
            return-object
            multiple
            v-model="selectedProducts"
            :loading="isProductsLoading"
          />
        </VCol>
        <VCol cols="12">
          <v-table fixed-header id="asd">
            <thead class="table-head">
              <tr>
                <th class="text-left font-weight-black"><p>Cant</p></th>
                <th class="text-left font-weight-black"><p>Nombre</p></th>
                <th class="text-left font-weight-black"><p>Precio</p></th>
              </tr>
            </thead>
            <tbody>
              <TransitionGroup name="fade">
                <tr v-for="data in selectedProductsNotReadOnly" :key="data.id">
                  <td style="padding: 0px; width: 40px">
                    <VTextField
                      v-model="data.amount"
                      class="weight-input"
                    ></VTextField>
                  </td>
                  <td style="max-width: 100px">
                    <div class="item-name">
                      <p class="m-0">{{ data.name }}</p>
                    </div>
                  </td>
                  <td class="pr-0">
                    <div class="d-flex flex-column">
                      <VTextField
                        v-model="data.price"
                        class="weight-input"
                      ></VTextField>
                    </div>
                  </td>
                </tr>
              </TransitionGroup>
            </tbody>
          </v-table>
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onPurchaseSubmit"
            :loading="savePurchaseMutations.isPending.value"
          >
            crear
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
