<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import type { Header } from "vue3-easy-data-table";
import useTransferences from "../../composables/transference/useTransferences";
import type { Transference } from "../../models/Transference";

interface props {
  transference?: Transference;
  search?: string;
}

const props = defineProps<props>();

const { isTransferencesLoading, transferences } = useTransferences();

const headers: Header[] = [
  { text: "Codigo", value: "sequential" },
  { text: "Fecha salida", value: "shipping_date" },
  { text: "Fecha entrega", value: "reception_date" },
  { text: "Estado", value: "status" },
  // { text: "", value: "actions", width: 110 },
];
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isTransferencesLoading"
    :item="transference"
    :items="transferences"
  ></BaseTableComponent>
</template>

<style scoped></style>
