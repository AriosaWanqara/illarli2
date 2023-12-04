<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import type { Promotion } from "../../models/Promotion";
import useProducts from "@dashboard/modules/products/composables/product/useProducts";
import usePromotionMutations from "../../compossables/promotion/usePromotionMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const { isProductsLoading, productsDropdown } = useProducts();
const { savePromotionMutation } = usePromotionMutations();
const router = useRouter();

const promotion = ref<Promotion>({
  type: "0",
} as Promotion);

const onPromotionSubmit = () => {
  savePromotionMutation.mutate(promotion.value);
};

watch(savePromotionMutation.isError, () => {
  if (savePromotionMutation.isError.value) {
    let x = savePromotionMutation.error.value as AxiosError;
    alert(JSON.stringify(x));
  }
});

watch(savePromotionMutation.isSuccess, () => {
  if (savePromotionMutation.isSuccess.value) {
    router.push({ name: "promotions-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Add Promo">
    <template #action>
      <RouterLink :to="{ name: 'promotions-list' }">
        <VBtn>back</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-1">
        <VCol cols="6">
          <v-btn-toggle
            v-model="promotion.type"
            color="primary"
            mandatory
            density="compact"
          >
            <v-btn value="0" variant="tonal">PROMOTION</v-btn>
            <v-btn value="1" variant="tonal">QUANTITY</v-btn>
          </v-btn-toggle>
        </VCol>
        <VCol cols="6">
          <VTextField label="name" v-model="promotion.name" />
        </VCol>
        <VCol cols="6">
          <VTextField label="description" v-model="promotion.description" />
        </VCol>
        <VCol cols="6">
          <VSelect
            :items="productsDropdown"
            item-title="label"
            label="Product id"
            item-value="value"
            v-model="promotion.product_id"
            :loading="isProductsLoading"
          />
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onPromotionSubmit"
            :loading="savePromotionMutation.isPending.value"
          >
            crear
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
