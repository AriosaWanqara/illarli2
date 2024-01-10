<script setup lang="ts">
import type { Header } from "vue3-easy-data-table";
import usePurchaseOrders from "../../composables/purchase/usePurchaseOrders";
import type { PurchaseOrder } from "../../models/PurchaseOrder";
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";

interface props {
  search?: string;
  purchaseOrder?: PurchaseOrder;
}

const props = defineProps<props>();

const { isPurchasesLoading, purchases, purchasesHasError, refetchPurchases } =
  usePurchaseOrders();

const headers: Header[] = [
  { text: "Fecha", value: "date" },
  { text: "Estado", value: "status" },
];
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isPurchasesLoading"
    :item="purchaseOrder"
    :items="purchases"
  >
  </BaseTableComponent>
</template>

<style scoped></style>
