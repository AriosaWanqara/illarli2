<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useWareHouses from "../../composables/warehouse/useWareHouses";
import type { WareHouse } from "../../models/WareHouse";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  wareHouse?: WareHouse;
}

const props = defineProps<props>();
const emits = defineEmits(["warehouse-delete", "warehouse-update"]);

const { wareHouses, isWareHousesLoading } = useWareHouses();

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
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isWareHousesLoading"
    :item="wareHouse"
    :items="wareHouses"
  >
    <template #actions="{ item }">
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
  </BaseTableComponent>
</template>

<style scoped></style>
