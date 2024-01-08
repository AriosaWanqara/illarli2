<script setup lang="ts">
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useCashdrawers from "../../composables/cashdrawer/useCashdrawers";
import type { Cashdrawer } from "../../models/Cashdrawer";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { computed } from "vue";
import { getPrimaryColor } from "@/utils/getColors";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  cashdrawer: Cashdrawer;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["update-cashdrawer", "delete-cashdrawer"]);

const { cashdrawers, isCashdrawersLoading } = useCashdrawers();

const headers: Header[] = [
  { text: "Nombre", value: "code" },
  { text: "", value: "actions", width: 110 },
];

const dataTable = ref();
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const page = ref(1);

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.cashdrawer.id) {
    if (props.cashdrawer.id == item.id) {
      return "selected-row";
    }
  }
  return "";
};

const onCashDrawerSelect = (cashdrawer: Cashdrawer) => {
  emits("update-cashdrawer", cashdrawer);
};
const onDelete = (cashdrawer: Cashdrawer) => {
  emits("delete-cashdrawer", cashdrawer);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :loading="isCashdrawersLoading"
    :theme-color="getPrimaryColor()"
    :items="cashdrawers"
    alternating
    ref="dataTable"
    :body-row-class-name="bodyRowClassNameFunction"
    :search-field="['name', 'description']"
    :search-value="props.search"
    :rows-per-page="10"
    hide-footer
    class="customize-table"
  >
    <template #item-actions="item">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            color="black"
            variant="text"
            :loading="isUpdateLoading"
            @click="onCashDrawerSelect(item)"
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
            color="error"
            v-bind="props"
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
    v-if="cashdrawers.length > 10"
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
