<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import usePromotions from "../../../compossables/promotion/usePromotions";
import type { FilterOption, Header } from "vue3-easy-data-table";
import type { Promotion } from "../../../models/Promotion";

interface props {
  search?: string;
  filterOptions?: FilterOption[];
}

const props = defineProps<props>();
const emits = defineEmits(["promotions-filter"]);

const { isPromotionsLoading, promotions, promotionsHasError } = usePromotions();

const headers: Header[] = [
  { text: "name", value: "name" },
  { text: "discount", value: "discount" },
  { text: "Acciones", value: "actions", width: 110 },
];

const onPromotionsFilter = (promotions: Promotion[]) => {
  emits("promotions-filter", promotions);
};
</script>

<template>
  <BaseTableComponent
    :items="promotions"
    :is-table-loading="isPromotionsLoading"
    :is-error="promotionsHasError"
    :headers="headers"
    :search="props.search"
    :filter-options="props.filterOptions"
    @filter-update="onPromotionsFilter"
  >
  </BaseTableComponent>
</template>

<style scoped></style>
