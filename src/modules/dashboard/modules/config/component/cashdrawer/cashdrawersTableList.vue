<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useCashdrawers from "../../composables/cashdrawer/useCashdrawers";
import type { Cashdrawer } from "../../models/Cashdrawer";

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

const onCashDrawerSelect = (cashdrawer: Cashdrawer) => {
  emits("update-cashdrawer", cashdrawer);
};
const onDelete = (cashdrawer: Cashdrawer) => {
  emits("delete-cashdrawer", cashdrawer);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isCashdrawersLoading"
    :item="cashdrawer"
    :items="cashdrawers"
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
  </BaseTableComponent>
</template>

<style scoped></style>
