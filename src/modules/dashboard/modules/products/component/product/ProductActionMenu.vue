<script setup lang="ts">
import useProductActionsMutations from "../../composables/product/useProductActionsMutations";
import type { Product } from "../../models/products/Product";

interface props {
  products: Product[];
}

const props = defineProps<props>();

const {} = useProductActionsMutations();
</script>

<template>
  <VMenu transition="scroll-x-reverse-transition">
    <template v-slot:activator="{ props }">
      <slot :activator="props" />
    </template>
    <VCard>
      <VCardItem> </VCardItem>
    </VCard>
  </VMenu>
</template>

<style scoped></style>
