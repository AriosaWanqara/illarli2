<script setup lang="ts">
interface props {
  color: string;
  name: string;
}

const { color, name } = defineProps<props>();
</script>

<template>
  <VCard flat variant="tonal">
    <VCardText class="tw-flex tw-justify-center tw-cursor-pointer">
      <div
        class="tw-w-8 tw-h-8 tw-rounded-full"
        :style="`background-color: ${color};`"
      ></div>
    </VCardText>
  </VCard>
</template>

<!-- background-color: ${color}; -->

<style scoped></style>
