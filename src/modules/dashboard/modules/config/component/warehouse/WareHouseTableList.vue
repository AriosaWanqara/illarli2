<script setup lang="ts">
import { getPrimaryColor } from "@/utils/getColors";
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useWareHouses from "../../composables/warehouse/useWareHouses";
import type { WareHouse } from "../../models/WareHouse";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { computed } from "vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  wareHouse?: WareHouse;
}

const props = defineProps<props>();
const emits = defineEmits(["warehouse-delete", "warehouse-update"]);

const { wareHouses, isWareHousesLoading } = useWareHouses();

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
  if (props.wareHouse) {
    if (props.wareHouse.id) {
      if (props.wareHouse.id == item.id) {
        return "selected-row";
      }
    }
  }
  return "";
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];

const onDelete = (wareHouse: WareHouse) => {
  emits("warehouse-delete", wareHouse);
};

const onWareHouseSelected = (wareHouse: WareHouse) => {
  emits("warehouse-update", wareHouse);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :theme-color="getPrimaryColor()"
    :items="wareHouses"
    :loading="isWareHousesLoading"
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
            color="black"
            v-bind="props"
            variant="text"
            @click="onWareHouseSelected(item)"
            :loading="isUpdateLoading"
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
    v-if="wareHouses.length > 10"
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
