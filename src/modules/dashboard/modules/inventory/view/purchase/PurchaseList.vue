<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import { type Header } from "vue3-easy-data-table";
import usePurcheses from "../../composables/purchase/usePurcheses";

const { isPurchasesLoading, purchases, purchasesHasError } = usePurcheses();

const headers: Header[] = [
  { text: "Codigo", value: "sequential" },
  { text: "Proveedor", value: "supplier.name" },
  { text: "subtotal", value: "subtotal" },
  { text: "", value: "actions", width: 110 },
];
</script>

<template>
  <UIScaffold title="Compras">
    <template #left-action> Compras </template>
    <template #right-action>
      <RouterLink :to="{ name: 'purchase-order-list' }">
        <VBtn> ordenes </VBtn>
      </RouterLink>
      <RouterLink :to="{ name: 'purchase-add' }">
        <VBtn color="success"> agregar </VBtn>
      </RouterLink>
    </template>
    <template #default>
      <EasyDataTable
        :headers="headers"
        :theme-color="'#f48225'"
        :items="purchases"
        :loading="isPurchasesLoading"
        alternating
        class="customize-table"
      >
      </EasyDataTable>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
