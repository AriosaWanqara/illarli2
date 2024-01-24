<script setup lang="ts">
interface props {
  label: string;
  img: string;
  isSelected: boolean;
  toggle: () => void;
}

const props = defineProps<props>();
</script>

<template>
  <VCard
    flat
    :variant="isSelected ? 'tonal' : 'outlined'"
    class="py-0 tw-max-w-[100px]"
    color="secondary"
    :class="isSelected ? 'selected' : ''"
    @click="toggle"
  >
    <VCardItem class="py-0 px-0">
      <div
        class="tw-flex tw-flex-col tw-gap-2 tw-py-2 tw-items-center tw-justify-end tw-cursor-pointer tw-relative tw-h-[85px]"
      >
        <img
          :src="props.img"
          alt=""
          height="60"
          width="60"
          class="tw-absolute tw-top-[-2px]"
        />
        <p
          class="tw-uppercase tw-font-semibold text-bg-primary tw-text-[0.83rem]"
        >
          {{ props.label }}
        </p>
      </div>
    </VCardItem>
  </VCard>
</template>

<style scoped>
.selected {
  border-color: rgba(var(--v-theme-secondary)) !important;
}
</style>
