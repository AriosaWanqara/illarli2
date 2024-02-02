<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "../../../products/models/products/Product";
import { calculateSummaryFromProducts } from "@/service/PriceCalculator";

interface props {
  products: Partial<Product>[];
}

const props = defineProps<props>();
const summary = computed(() => calculateSummaryFromProducts(props.products));
</script>

<template>
  <v-table density="compact" class="custome">
    <tbody>
      <tr v-for="item in summary">
        <td>{{ item.label }}</td>

        <td>${{ item.value }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped lang="scss">
.custome {
  border: 1px solid rgba(var(--v-theme-borderColor));
  border-radius: 10px;
  background-color: rgba(var(--v-theme-containerBg));
  & tbody > tr:not(:last-child) > td {
    border-bottom: 1px solid rgba(var(--v-theme-borderColor)) !important;
  }
  & tbody > tr > td {
    text-align: start;
    height: 30px !important;
  }
  & tbody > tr:last-child {
    text-align: start;
    height: 40px !important;
  }
  & tbody > tr {
    padding-top: 1px !important;
    padding-bottom: 1px !important;
  }
  & tbody > tr:last-child td:first-child {
    font-size: 1.43rem;
    font-weight: 600;
    color: #ff8548;
  }
  & tbody > tr:last-child td:nth-child(2) {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>
