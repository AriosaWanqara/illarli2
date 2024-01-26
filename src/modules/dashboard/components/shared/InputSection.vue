<script setup lang="ts">
interface props {
  labelMessage: string;
  required?: boolean;
}

const props = defineProps<props>();
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-1">
    <label for="" class="tw-uppercase tw-font-semibold tw-text-gray-400">
      {{ props.labelMessage }}
      <span v-if="required" class="tw-text-red-300">*</span>
    </label>
    <slot />
  </div>
</template>

<style scoped></style>
