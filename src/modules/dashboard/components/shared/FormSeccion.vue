<script setup lang="ts">
interface props {
  title: string;
}

const props = defineProps<props>();
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-2">
    <h2 class="title-1 tw-font-semibold">{{ props.title }}</h2>
    <div>
      <VCard class="py-0" flat variant="outlined">
        <VCardItem class="py-0 px-0">
          <div class="tw-py-6 tw-px-4">
            <slot />
          </div>
        </VCardItem>
      </VCard>
    </div>
  </div>
</template>

<style scoped></style>
