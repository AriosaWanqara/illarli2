<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useBrands from "../../composables/brand/useBrands";
import type { Brand } from "../../models/Brand";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  brand: Brand;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["brand-update", "brand-delete"]);
const { brands, isBrandsLoading } = useBrands();

const headers: Header[] = [
  { text: "Nombre", value: "name", sortable: true },
  { text: "Acciones", value: "actions", width: 110 },
];

const onDelete = (brand: Brand) => {
  emits("brand-delete", brand);
};

const onBrandSelected = (brand: Brand) => {
  emits("brand-update", brand);
};
</script>

<template>
  <div>
    <BaseTableComponent
      :headers="headers"
      :item="brand"
      :items="brands"
      :is-table-loading="isBrandsLoading"
    >
      <template #actions="{ item }">
        <v-tooltip text="Edit">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              color="black"
              v-bind="props"
              :loading="isUpdateLoading"
              variant="text"
              @click="onBrandSelected(item)"
            >
              <Icon icon="lucide:pencil" />
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              color="error"
              flat
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
  </div>
</template>

<style scoped></style>
