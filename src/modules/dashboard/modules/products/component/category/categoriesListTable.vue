<script setup lang="ts">
import imageNotFound from "@/assets/Image-not-found.png";
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { FilterOption, Header } from "vue3-easy-data-table";
import useCategories from "../../composables/category/useCategories";
import type { Category } from "../../models/Category";

interface props {
  category: Category;
  isModifyLoading: boolean;
  isDeleteLoading: boolean;
  search?: string;
  filterOptions?: FilterOption[];
}

const props = defineProps<props>();
const emits = defineEmits(["delete-handle", "update-handle", "filter-update"]);
const { categories, isCategoriesLoading, categoriesHasError } = useCategories();

const headers: Header[] = [
  { text: "Nombre de la categoría", value: "name", sortable: true },
  { text: "Acciones", value: "actions", width: 110 },
];

const onUpdateCategory = (category: Category) => {
  emits("update-handle", category);
};
const onDeleteCategory = (category: Category) => {
  emits("delete-handle", category);
};
const onCategoriesFilterUpdate = (categories: Category[]) => {
  emits("filter-update", categories);
};
</script>

<template>
  <div class="tw-flex tw-flex-col">
    <BaseTableComponent
      :headers="headers"
      :item="category"
      :items="categories"
      :search="props.search"
      :filter-options="props.filterOptions"
      :search-field="['name', 'description']"
      :is-table-loading="isCategoriesLoading"
      :is-error="categoriesHasError"
      @filter-update="onCategoriesFilterUpdate"
    >
      <template #name="{ item }">
        <div class="tw-flex tw-gap-2">
          <div
            class="tw-flex tw-justify-center tw-items-center tw-rounded-md tw-overflow-hidden"
          >
            <VImg
              :src="item.image ? item.image : imageNotFound"
              height="40"
              width="40"
              aspect-ratio="2/2"
            />
          </div>
          <div class="tw-flex tw-flex-col tw-justify-center">
            <p class="tw-font-semibold tw-m-0 tw-leading-4">
              {{ item.name }}
            </p>
            <p
              class="tw-text-gray-400 tw-m-0 tw-leading-4 tw-truncate tw-w-[15ch]"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </template>
      <template #actions="{ item }">
        <v-tooltip text="Edit">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              v-bind="props"
              color="black"
              variant="text"
              :loading="isModifyLoading"
              @click="onUpdateCategory(item)"
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
              @click="onDeleteCategory(item)"
              :loading="isDeleteLoading"
            >
              <Icon icon="solar:trash-bin-trash-outline" />
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </BaseTableComponent>
  </div>
</template>

<style scoped></style>
