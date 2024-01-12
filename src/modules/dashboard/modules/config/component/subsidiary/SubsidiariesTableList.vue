<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";
import type { Subsidiary } from "../../models/Subsidiary";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  subsidiary?: Subsidiary;
}

const props = defineProps<props>();
const emits = defineEmits(["subsidiary-update", "subsidiary-delete"]);
const { isSubsidiariesLoading, subsidiaries, subsidiariesHasError } =
  useSubsidiaries();

const headers: Header[] = [
  { value: "businessname", text: "Nombre" },
  { value: "actions", text: "Acciones", width: 110 },
];

const onDelete = (subsidiary: Subsidiary) => {
  emits("subsidiary-delete", subsidiary);
};
const onSelect = (subsidiary: Subsidiary) => {
  emits("subsidiary-update", subsidiary);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isSubsidiariesLoading"
    :item="subsidiary"
    :items="subsidiaries"
    :is-error="subsidiariesHasError"
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
            @click="onSelect(item)"
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
