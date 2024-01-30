<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { RouterLink } from "vue-router";
import usePromotions from "../../compossables/promotion/usePromotions";
import usePromotionMutations from "../../compossables/promotion/usePromotionMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import PromotionsTableList from "../../components/promotions/list/PromotionsTableList.vue";

const { isPromotionsLoading, promotions, promotionsHasError } = usePromotions();
const { deletePromotionMutation } = usePromotionMutations();

const onDelete = (id: string) => {
  deletePromotionMutation.mutate(id);
};

watch(deletePromotionMutation.isError, () => {
  if (deletePromotionMutation.isError.value) {
    let x = deletePromotionMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(deletePromotionMutation.isSuccess, () => {
  if (deletePromotionMutation.isSuccess.value) {
    promotions.value = promotions.value.filter(
      (x) => x.id != deletePromotionMutation.variables.value
    );
  }
});

const onPromotionsFilter = (filterPromotions: any) => {};
</script>

<template>
  <ViewScaffold title="Promotions">
    <template #action>
      <RouterLink :to="{ name: 'promotions-add' }">
        <VBtn>crear</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <PromotionsTableList @promotions-filter="onPromotionsFilter" />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
