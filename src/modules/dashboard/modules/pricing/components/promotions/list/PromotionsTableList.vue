<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import usePromotions from "../../../compossables/promotion/usePromotions";
import type { FilterOption, Header } from "vue3-easy-data-table";
import type { Promotion } from "../../../models/Promotion";
import { Icon } from "@iconify/vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  filterOptions?: FilterOption[];
}

const props = defineProps<props>();
const emits = defineEmits(["promotions-filter", "promotion-delete"]);

const { isPromotionsLoading, promotions, promotionsHasError } = usePromotions();

const headers: Header[] = [
  { text: "name", value: "name" },
  { text: "discount", value: "discount" },
  { text: "weekday", value: "weekday" },
  { text: "Acciones", value: "actions", width: 110 },
];

const onPromotionsFilter = (promotions: Promotion[]) => {
  emits("promotions-filter", promotions);
};

const onSelected = (params: any) => {};
const onDelete = (params: any) => {
  emits("promotion-delete", params);
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
    <template #actions="{ item }">
      <div class="tw-flex tw-w-full tw-justify-end">
        <v-tooltip text="Edit">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              color="black"
              v-bind="props"
              variant="text"
              :loading="isUpdateLoading"
              @click="onSelected(item)"
            >
              <Icon icon="lucide:pencil" />
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              v-bind="props"
              color="error"
              variant="text"
              @click="onDelete(item)"
              :loading="isDeleteLoading"
            >
              <Icon icon="mdi:trash-can-outline" />
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
  </BaseTableComponent>
</template>

<style scoped></style>
