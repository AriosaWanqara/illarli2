<script setup lang="ts">
interface props {
  title: string;
}

const props = defineProps<props>();
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <h2 class="title-1 tw-font-semibold">{{ props.title }}</h2>
    <div>
      <VCard class="py-0" flat variant="outlined">
        <VCardItem class="py-0">
          <div class="tw-py-6">
            <slot />
          </div>
        </VCardItem>
      </VCard>
    </div>
  </div>
</template>

<style scoped></style>
