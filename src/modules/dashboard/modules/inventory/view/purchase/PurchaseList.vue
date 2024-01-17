<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import { type Header } from "vue3-easy-data-table";
import PurchasesTableList from "../../components/purchase/PurchasesTableList.vue";
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
  <ViewScaffold>
    <template #default>
      <div>
        <div class="tw-flex tw-mb-2 tw-gap-2 tw-justify-end">
          <RouterLink :to="{ name: 'purchase-order-list' }">
            <VBtn> ordenes </VBtn>
          </RouterLink>
          <RouterLink :to="{ name: 'purchase-add' }">
            <VBtn color="success"> agregar </VBtn>
          </RouterLink>
          <RouterLink :to="{ name: 'purchase-add2' }">
            <VBtn color="success"> agregar2 </VBtn>
          </RouterLink>
        </div>
        <PurchasesTableList />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
