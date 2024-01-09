<script setup lang="ts">
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import usePurcheses from "../../composables/purchase/usePurcheses";
import { getPrimaryColor } from "@/utils/getColors";
import type { Purchases } from "../../models/Purchases";
import { ref } from "vue";
import { computed } from "vue";

interface props {
  search?: string;
  purchase?: Purchases;
}

const props = defineProps<props>();

const { isPurchasesLoading, purchases } = usePurcheses();

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
  { text: "Proveedor", value: "supplier.name" },
  { text: "subtotal", value: "subtotal" },
  { text: "", value: "actions", width: 110 },
];

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.purchase) {
    if (props.purchase.id) {
      if (props.purchase.id == item.id) {
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
    :items="purchases"
    :loading="isPurchasesLoading"
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
    v-if="purchases.length > 10"
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
