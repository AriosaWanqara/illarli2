<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import type { Header } from "vue3-easy-data-table";

interface props {
  search?: string;
}

const props = defineProps<props>();

const headers: Header[] = [
  { text: "Servicio", value: "name" },
  { text: "Precio", value: "price" },
  { text: "Estado", value: "status" },
  { text: "Acciones", value: "actions", width: 110 },
];
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :search="props.search"
    :is-table-loading="false"
    :items="[]"
    :item="{}"
    :is-error="false"
  >
  </BaseTableComponent>
</template>

<style scoped></style>
