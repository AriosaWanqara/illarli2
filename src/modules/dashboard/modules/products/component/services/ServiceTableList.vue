<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import type { FilterOption, Header } from "vue3-easy-data-table";

interface props {
  isModifyLoading: boolean;
  isDeleteLoading: boolean;
  isTableError: boolean;
  services: any[];
  search?: string;
  service?: any;
  filterOptions?: FilterOption[];
}

const emits = defineEmits([
  "update-service",
  "delete-service",
  "selected-service",
  "filter-service",
]);
const props = defineProps<props>();
const itemsSelected = ref([]);

const headers: Header[] = [
  { text: "Servicio", value: "name" },
  { text: "Precio", value: "price" },
  { text: "Estado", value: "status" },
  { text: "Acciones", value: "actions", width: 110 },
];

const onUpdate = (service: any) => {
  emits("update-service", service);
};
const onDelete = (service: any) => {
  emits("delete-service", service);
};
const onSelected = (services: any) => {
  itemsSelected.value = services;
  emits("selected-service", services);
};
const onFilter = (services: any) => {
  emits("filter-service", services);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :search="props.search"
    :is-table-loading="false"
    :items="props.services"
    :item="props.service"
    :items-selected="itemsSelected"
    :is-error="props.isTableError"
    :filter-options="props.filterOptions"
    @item-selected-update="onSelected"
    @filter-update="onFilter"
  >
    <template #actions="{ item }">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            color="black"
            variant="text"
            :loading="isModifyLoading"
            @click="onUpdate(item)"
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
            <Icon icon="solar:trash-bin-trash-outline" />
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </BaseTableComponent>
</template>

<style scoped></style>
