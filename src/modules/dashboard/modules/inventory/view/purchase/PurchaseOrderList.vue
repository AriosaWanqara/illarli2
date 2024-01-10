<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";
import PurchasesOrderTableList from "../../components/purchase/PurchasesOrderTableList.vue";
import type { PurchaseOrder } from "../../models/PurchaseOrder";

const selectedPurchase = ref<PurchaseOrder>({} as PurchaseOrder);
</script>

<template>
  <ViewScaffold>
    <template #default>
      <div class="tw-flex tw-justify-between tw-mb-2 tw-items-center">
        <p class="tw-font-semibold tw-text-gray-400">
          Todas las ordenes de compra
        </p>
        <div class="">
          <VBtn color="success" prepend-icon="mdi-plus">Nueva</VBtn>
        </div>
      </div>
      <PurchasesOrderTableList :purchase-order="selectedPurchase" />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
