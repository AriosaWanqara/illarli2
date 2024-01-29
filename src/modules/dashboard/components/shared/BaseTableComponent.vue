<script setup lang="ts">
import { getPrimaryColor } from "@/utils/getColors";
import { useSlots } from "vue";
import { computed, watch } from "vue";
import { ref } from "vue";
import type {
  BodyRowClassNameFunction,
  FilterOption,
  Header,
  Item,
} from "vue3-easy-data-table";
import TableLoading from "./table/TableLoading.vue";
import TableEmpty from "./table/TableEmpty.vue";

interface props {
  items: Object[];
  isTableLoading: boolean;
  isError: boolean;
  headers: Header[];
  searchField?: string[];
  search?: string;
  filterOptions?: FilterOption[];
  item?: Object;
  itemsSelected?: Object;
}
const slots = useSlots();
const hasSlot = (name: string) => {
  return !!slots[name];
};
const props = defineProps<props>();
const emits = defineEmits(["filter-update", "item-selected-update"]);
const totalItemsShowed = ref(10);
const dataTable = ref();
const selectedItem = computed({
  get: () => props.itemsSelected,
  set: (val) => emits("item-selected-update", val),
});
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const page = ref(1);

watch(page, () => {
  if (page.value > 0) {
    dataTable.value.updatePage(page.value);
  }
});

watch(totalItemsShowed, () => {
  dataTable.value.updateRowsPerPageActiveOption(totalItemsShowed.value);
});

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  try {
    if (props.item) {
      //@ts-ignore
      if (props.item.id) {
        //@ts-ignore
        if (props.item.id == item.id) {
          return "selected-row";
        }
      }
    }
  } catch (error) {
    return "";
  }
  return "";
};
const updateItems = (items: Object) => {
  emits("filter-update", items);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    v-model:items-selected="selectedItem"
    :theme-color="getPrimaryColor()"
    :items="props.items"
    :loading="props.isTableLoading"
    ref="dataTable"
    :body-row-class-name="bodyRowClassNameFunction"
    :search-field="searchField"
    :search-value="props.search"
    :rows-per-page="totalItemsShowed"
    :filter-options="filterOptions"
    hide-footer
    @update-page-items="updateItems"
    class="customize-table"
  >
    <template #loading>
      <TableLoading />
    </template>
    <template #empty-message>
      <TableEmpty :has-error="props.isError" />
    </template>
    <template
      v-for="head in props.headers"
      v-slot:[`item-${head.value}`]="item"
    >
      <slot :name="`${head.value}`" :item="item" v-if="hasSlot(head.value)" />
      <p v-else>{{ item[head.value] }}</p>
    </template>
  </EasyDataTable>
  <div
    class="tw-flex tw-justify-between tw-items-center"
    v-if="props.items.length > 10"
  >
    <div class="tw-flex tw-gap-1 tw-items-center tw-justify-center">
      <p class="tw-text-sm">Mostrando</p>
      <VSelect
        v-model="totalItemsShowed"
        density="compact"
        hide-spin-buttons
        hide-details
        :items="[10, 20, 30, 40, 50]"
        class="min-select"
        menu-icon=""
      />
      <p class="tw-text-gray-400">items por página</p>
    </div>
    <v-pagination
      :length="maxPaginationNumber"
      density="compact"
      active-color="secondary"
      v-model="page"
      variant="outlined"
      class="tw-flex-1"
    />
  </div>
</template>

<style scoped></style>
