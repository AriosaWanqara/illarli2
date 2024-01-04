<script setup lang="ts">
import imageNotFound from "@/assets/Image-not-found.png";
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useCategories from "../../composables/category/useCategories";
import type { Category } from "../../models/Category";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { computed } from "vue";
import { watch } from "vue";

interface props {
  category: Category;
  isModifyLoading: boolean;
  isDeleteLoading: boolean;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["delete-handle", "update-handle"]);
const dataTable = ref();
const { categories, isCategoriesLoading } = useCategories();
const page = ref(1);

const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  rowNumber: number
): string => {
  if (props.category.id) {
    if (props.category.id == item.id) {
      return "selected-row";
    }
  }
  return "";
};

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

watch(page, () => {
  if (page.value > 0) {
    dataTable.value.updatePage(page.value);
  }
});
</script>

<template>
  <div class="tw-flex tw-flex-col">
    <EasyDataTable
      :headers="headers"
      :theme-color="'#f48225'"
      :items="categories"
      ref="dataTable"
      :body-row-class-name="bodyRowClassNameFunction"
      :loading="isCategoriesLoading"
      alternating
      :search-field="['name', 'description']"
      :search-value="props.search"
      :rows-per-page="10"
      hide-footer
      class="customize-table tw-w-full"
    >
      <template #item-name="item">
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
      <template #item-actions="item">
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
    </EasyDataTable>
    <div
      class="tw-flex tw-justify-between tw-items-center"
      v-if="categories.length > 10"
    >
      <p class="tw-text-sm">
        Mostrando {{ currentPageLastIndex }} de
        {{ clientItemsLength }} resultados
      </p>
      <v-pagination
        :length="maxPaginationNumber"
        density="compact"
        color="primary"
        v-model="page"
        class="tw-flex-1"
      />
    </div>
  </div>
</template>

<style scoped></style>
