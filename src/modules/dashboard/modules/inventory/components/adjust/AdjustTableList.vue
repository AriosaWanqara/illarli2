<script setup lang="ts">
import { ref } from "vue";
import useAdjust from "../../composables/adjust/useAdjust";
import type { Adjust } from "../../models/Adjust";
import { computed } from "vue";
import { getPrimaryColor } from "@/utils/getColors";
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";

const { adjust, isAdjustLoading } = useAdjust();

interface props {
  search?: string;
  propsAdjust?: Adjust;
}

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

const headers: Header[] = [
  { text: "Codigo", value: "sequential" },
  { text: "Fecha", value: "date" },
  { text: "Tipo", value: "type" },
  { text: "", value: "actions", width: 110 },
];

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.propsAdjust) {
    if (props.propsAdjust.id) {
      if (props.propsAdjust.id == item.id) {
        return "selected-row";
      }
    }
  }
  return "";
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :theme-color="getPrimaryColor()"
    :items="adjust"
    :loading="isAdjustLoading"
    alternating
    ref="dataTable"
    :body-row-class-name="bodyRowClassNameFunction"
    :search-field="['date']"
    :search-value="props.search"
    :rows-per-page="10"
    hide-footer
    class="customize-table"
  >
  </EasyDataTable>
  <div
    class="tw-flex tw-justify-between tw-items-center"
    v-if="adjust.length > 10"
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
