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
import type { FilterOption } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";

const { promotions } = usePromotions();
const { deletePromotionMutation } = usePromotionMutations();
const filtersPromotions = ref<Promotion[]>([]);
const search = ref();
const newFilters = ref<FilterOption[]>([]);
const openFilter = ref(false);
const showConfirmDelete = ref(false);
const deleteId = ref();

const onDelete = (promotionsToDelete: Promotion) => {
  deleteId.value = promotionsToDelete.id;
  showConfirmDelete.value = true;
};

const onConfirmDelete = (response: boolean) => {
  if (response) {
    deletePromotionMutation.mutate(deleteId.value);
  }
  showConfirmDelete.value = false;
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
  filtersPromotions.value = filterPromotions;
};
</script>

<template>
  <ViewScaffold>
    <template #default>
      <div class="tw-flex tw-flex-col tw-gap-4 tw-mb-2">
        <div class="tw-flex tw-justify-between tw-items-center">
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
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-font-semibold tw-text-[#036666]">
            <p>Todas las promociones ({{ promotions.length }})</p>
          </div>
          <div class="">
            <VBtn
              variant="tonal"
              :color="newFilters.length > 0 ? 'info' : 'primary'"
              class="px-0"
              @click="openFilter = true"
            >
              <Icon
                icon="mdi:filter-off"
                :class="'tw-text-blue-600'"
                height="16"
                v-if="newFilters.length > 0"
              />
              <Icon
                icon="mdi:filter"
                :class="'textPrimary'"
                height="16"
                v-else
              />
            </VBtn>
          </div>
        </div>
      </div>
      <PromotionsTableList
        @promotions-filter="onPromotionsFilter"
        @promotion-delete="onDelete"
        :is-delete-loading="deletePromotionMutation.isPending.value"
        :is-update-loading="false"
        :search="search"
      />
      <ConfirmDeleteDialog
        :dialog-text="'Esta seguro que desea borrar el item'"
        :title="'Confirmar borrado'"
        :show-modal="showConfirmDelete"
        @confirm-response="onConfirmDelete"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
