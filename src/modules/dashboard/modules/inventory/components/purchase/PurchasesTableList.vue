<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import type { Header } from "vue3-easy-data-table";
import usePurcheses from "../../composables/purchase/usePurcheses";
import type { Purchases } from "../../models/Purchases";

interface props {
  search?: string;
  purchase?: Purchases;
}

const props = defineProps<props>();

const { isPurchasesLoading, purchases, purchasesHasError } = usePurcheses();

const headers: Header[] = [
  { text: "Codigo", value: "sequential" },
  { text: "Proveedor", value: "supplier.name" },
  { text: "subtotal", value: "subtotal" },
  { text: "", value: "actions", width: 110 },
];
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isPurchasesLoading"
    :item="purchase"
    :items="purchases"
    :is-error="purchasesHasError"
  ></BaseTableComponent>
</template>

<style scoped></style>
