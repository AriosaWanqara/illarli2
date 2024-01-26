<script setup lang="ts">
import { usethemeCustomizer } from "@/stores/themeCustomizer";
import { useSlots } from "vue";

const store = usethemeCustomizer();
const slots = useSlots();
const hasSlot = (name: string) => {
  return !!slots[name];
};
</script>

<template>
  <VCard
    class="py-0 px-0"
    :class="store.themeConfig.cardHasShadow ? 'box-card' : ''"
    variant="flat"
    :flat="store.isDark"
  >
    <VCardTitle v-if="hasSlot('title')" class="py-0 px-0">
      <slot name="title" />
    </VCardTitle>
    <VCardItem class="py-0 px-0">
      <slot />
    </VCardItem>
  </VCard>
</template>

<style scoped></style>
