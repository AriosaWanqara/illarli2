<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

interface props {
  label: string;
  to: string;
  img: string;
}

const props = defineProps<props>();
const route = useRoute();
const router = useRouter();
const onRedirect = () => {
  router.push({ name: props.to });
};
</script>

<template>
  <VCard
    flat
    :variant="route.name == props.to ? 'tonal' : 'outlined'"
    class="py-0 tw-max-w-[100px]"
    color="secondary"
    @click="onRedirect"
    :class="route.name == props.to ? 'selected' : ''"
  >
    <VCardItem class="py-0 px-0">
      <div
        class="tw-flex tw-flex-col tw-gap-2 tw-py-3 tw-items-center tw-cursor-pointer"
      >
        <img :src="props.img" alt="" height="40" width="40" />
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
