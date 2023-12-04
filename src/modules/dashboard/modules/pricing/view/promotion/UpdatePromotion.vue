<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import usePromotion from "../../compossables/promotion/usePromotion";
import useProducts from "@dashboard/modules/products/composables/product/useProducts";
import usePromotionMutations from "../../compossables/promotion/usePromotionMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const params = useRoute().params;
const { isPromotionLoading, promotionToUpdate, promotionHasError } =
  usePromotion(params.id.toString());
const { isProductsLoading, productsDropdown } = useProducts();
const { updatePromotionMutation } = usePromotionMutations();
const router = useRouter();

const onPromotionSubmit = () => {
  updatePromotionMutation.mutate(promotionToUpdate.value);
};

watch(updatePromotionMutation.isError, () => {
  if (updatePromotionMutation.isError.value) {
    let x = updatePromotionMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updatePromotionMutation.isSuccess, () => {
  if (updatePromotionMutation.isSuccess.value) {
    router.push({ name: "promotions-list" });
  }
});
</script>

<template>
  <ViewScaffold title="update promo">
    <template #action>
      <RouterLink :to="{ name: 'promotions-list' }">
        <VBtn> back </VBtn>
      </RouterLink>
    </template>
    <template #default>
      <VRow v-if="isPromotionLoading">
        <p>cargando...</p>
      </VRow>
      <VRow v-else-if="promotionHasError">
        <p>error...</p>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="6">
          <v-btn-toggle
            v-model="promotionToUpdate.type"
            color="primary"
            mandatory
            density="compact"
          >
            <v-btn value="0" variant="tonal">PROMOTION</v-btn>
            <v-btn value="1" variant="tonal">QUANTITY</v-btn>
          </v-btn-toggle>
        </VCol>
        <VCol cols="6">
          <VTextField label="name" v-model="promotionToUpdate.name" />
        </VCol>
        <VCol cols="6">
          <VTextField
            label="description"
            v-model="promotionToUpdate.description"
          />
        </VCol>
        <VCol cols="6">
          <VSelect
            :items="productsDropdown"
            item-title="label"
            label="Product id"
            item-value="value"
            v-model="promotionToUpdate.product_id"
            :loading="isProductsLoading"
          />
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onPromotionSubmit"
            :loading="updatePromotionMutation.isPending.value"
          >
            crear
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
