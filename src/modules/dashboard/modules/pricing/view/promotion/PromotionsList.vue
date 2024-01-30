<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { RouterLink } from "vue-router";
import usePromotions from "../../compossables/promotion/usePromotions";
import usePromotionMutations from "../../compossables/promotion/usePromotionMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import PromotionsTableList from "../../components/promotions/list/PromotionsTableList.vue";
import { ref } from "vue";
import type { Promotion } from "../../models/Promotion";

const { promotions } = usePromotions();
const { deletePromotionMutation } = usePromotionMutations();
const filtersPromotions = ref<Promotion[]>([]);
const search = ref();

const onDelete = (promotionsToDelete: Promotion) => {
  deletePromotionMutation.mutate(promotionsToDelete.id);
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

const onPromotionsFilter = (filterPromotions: any) => {
  console.log(filterPromotions);
  filtersPromotions.value = filterPromotions;
};
</script>

<template>
  <ViewScaffold>
    <template #default>
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <VTextField
          placeholder="Buscar"
          prepend-inner-icon="mdi-magnify"
          class="tw-max-w-[50%] tw-min-w-[160px]"
          variant="outlined"
          v-model="search"
        />
        <RouterLink :to="{ name: 'promotions-add' }">
          <VBtn color="success" prepend-icon="mdi-plus">Nueva</VBtn>
        </RouterLink>
      </div>
      <PromotionsTableList
        @promotions-filter="onPromotionsFilter"
        @promotion-delete="onDelete"
        :is-delete-loading="deletePromotionMutation.isPending.value"
        :is-update-loading="false"
        :search="search"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
