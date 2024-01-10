<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import type { Header } from "vue3-easy-data-table";
import useAdjust from "../../composables/adjust/useAdjust";
import type { Adjust } from "../../models/Adjust";

const { adjust, isAdjustLoading } = useAdjust();

interface props {
  search?: string;
  propsAdjust?: Adjust;
}

const props = defineProps<props>();

const headers: Header[] = [
  { text: "Codigo", value: "sequential" },
  { text: "Fecha", value: "date" },
  { text: "Tipo", value: "type" },
  { text: "", value: "actions", width: 110 },
];
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isAdjustLoading"
    :item="propsAdjust"
    :items="adjust"
  ></BaseTableComponent>
</template>

<style scoped></style>
