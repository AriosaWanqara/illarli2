<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import type { Provider } from "../models/Provider";

interface props {
  persons: Provider[];
  isTableLoading: boolean;
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  person?: Provider;
}

const props = defineProps<props>();
const emits = defineEmits(["person-update", "person-delete"]);

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Identificacion", value: "identity" },
  { text: "", value: "actions", width: 110 },
];

const onDelete = (person: Provider) => {
  emits("person-delete", person);
};
const onPersonSelected = (person: Provider) => {
  emits("person-update", person);
};
</script>

<template>
  <BaseTableComponent
    :is-table-loading="isTableLoading"
    :item="person"
    :items="persons"
    :headers="headers"
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
            @click="onPersonSelected(item)"
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
  </BaseTableComponent>
</template>

<style scoped></style>
