<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useRates from "../../compossables/rate/useRates";
import type { Rate } from "../../models/Rate";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  rate: Rate;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["update-rate", "delete-rate"]);
const { isRatesLoading, rates } = useRates();

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "operation", value: "operation" },
  { text: "type", value: "type" },
  { text: "", value: "actions", width: 110 },
];

const onRateSelected = (rate: Rate) => {
  emits("update-rate", rate);
};

const onDelete = (rate: Rate) => {
  emits("delete-rate", rate);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isRatesLoading"
    :item="rate"
    :items="rates"
  >
    <template #type="{ item }">
      <p v-if="item.type == 1">Valor</p>
      <p v-else>Porcentage</p>
    </template>
    <template #operation="{ item }">
      <p v-if="item.operation == 1">Positivo</p>
      <p v-else>Negativo</p>
    </template>
    <template #actions="{ item }">
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
  </BaseTableComponent>
</template>

<style scoped></style>
