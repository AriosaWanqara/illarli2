<script setup lang="ts">
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useRates from "../../compossables/rate/useRates";
import type { Rate } from "../../models/Rate";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { computed } from "vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  rate: Rate;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["update-rate", "delete-rate"]);
const { isRatesLoading, rates } = useRates();

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
  { text: "Nombre", value: "name" },
  { text: "operation", value: "operation" },
  { text: "type", value: "type" },
  { text: "", value: "actions", width: 110 },
];

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.rate.id) {
    if (props.rate.id == item.id) {
      return "selected-row";
    }
  }
  return "";
};

const onRateSelected = (rate: Rate) => {
  emits("update-rate", rate);
};

const onDelete = (rate: Rate) => {
  emits("delete-rate", rate);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :theme-color="'#f48225'"
    :body-row-class-name="bodyRowClassNameFunction"
    ref="dataTable"
    :items="rates"
    :loading="isRatesLoading"
    alternating
    :search-field="['name', 'description']"
    :search-value="props.search"
    :rows-per-page="10"
    hide-footer
    class="customize-table"
  >
    <template #item-type="item">
      <p v-if="item.type == 1">Valor</p>
      <p v-else>Porcentage</p>
    </template>
    <template #item-operation="item">
      <p v-if="item.operation == 1">Positivo</p>
      <p v-else>Negativo</p>
    </template>
    <template #item-actions="item">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            color="black"
            v-bind="props"
            variant="text"
            :loading="isUpdateLoading"
            @click="onRateSelected(item)"
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
    </template>
  </EasyDataTable>
  <div
    class="tw-flex tw-justify-between tw-items-center"
    v-if="rates.length > 10"
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
