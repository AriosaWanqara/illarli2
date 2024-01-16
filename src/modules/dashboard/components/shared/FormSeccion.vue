<script setup lang="ts">
interface props {
  title: string;
}

const props = defineProps<props>();
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-2">
    <h2 class="title-1 tw-font-semibold">{{ props.title }}</h2>
    <VCard class="py-0" flat variant="outlined">
      <VCardItem class="py-0">
        <slot />
      </VCardItem>
    </VCard>
  </div>
</template>

<style scoped></style>
