<script setup lang="ts">
import { getPrimaryColor } from "@/utils/getColors";
import { useSlots } from "vue";
import { computed, watch } from "vue";
import { ref } from "vue";
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import TableLoading from "./table/TableLoading.vue";
import TableEmpty from "./table/TableEmpty.vue";

interface props {
  items: Object[];
  isTableLoading: boolean;
  headers: Header[];
  searchField?: string[];
  search?: string;
  item?: Object;
}
const slots = useSlots();
const hasSlot = (name: string) => {
  return !!slots[name];
};
const props = defineProps<props>();

const dataTable = ref();
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const page = ref(1);

watch(page, () => {
  if (page.value > 0) {
    dataTable.value.updatePage(page.value);
  }
});

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  try {
    if (props.item) {
      //@ts-ignore
      if (props.item.id == item.id) {
        return "selected-row";
      }
    }
  } catch (error) {
    return "";
  }
  return "";
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :theme-color="getPrimaryColor()"
    :items="props.items"
    :loading="props.isTableLoading"
    alternating
    ref="dataTable"
    :body-row-class-name="bodyRowClassNameFunction"
    :search-field="searchField"
    :search-value="props.search"
    :rows-per-page="10"
    hide-footer
    class="customize-table"
  >
    <template #loading>
      <TableLoading />
    </template>
    <template #empty-message>
      <TableEmpty />
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
    <p class="tw-text-sm">
      Mostrando {{ currentPageLastIndex }} de {{ clientItemsLength }} resultados
    </p>
    <v-pagination
      :length="maxPaginationNumber"
      density="compact"
      color="primary"
      v-model="page"
      class="tw-flex-1"
    />
  </div>
</template>

<style scoped></style>
