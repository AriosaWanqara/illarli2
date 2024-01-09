<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import type { Transference } from "../../models/Transference";
import { getPrimaryColor } from "@/utils/getColors";
import useTransferences from "../../composables/transference/useTransferences";

interface props {
  transference?: Transference;
  search?: string;
}

const props = defineProps<props>();

const { isTransferencesLoading, transferences } = useTransferences();

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
  { text: "Fecha salida", value: "shipping_date" },
  { text: "Fecha entrega", value: "reception_date" },
  { text: "Estado", value: "status" },
  { text: "", value: "actions", width: 110 },
];

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.transference) {
    if (props.transference.id) {
      if (props.transference.id == item.id) {
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
    :items="transferences"
    :loading="isTransferencesLoading"
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
    v-if="transferences.length > 10"
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
