<script setup lang="ts">
interface props {
  image: string;
  name: string;
  to: string;
}

const router = useRouter();
const props = defineProps<props>();

import { useRouter } from "vue-router";

const onRedirect = () => {
  router.push({ name: props.to });
};
</script>

<template>
  <VCard
    max-width="130"
    class="tw-cursor-pointer border-access"
    variant="flat"
    @click="onRedirect"
  >
    <div
      class="tw-w-full tw-flex tw-justify-center tw-items-center tw-py-4 tw-flex-col tw-px-1"
    >
      <img :src="props.image" alt="" />
      <h1 class="tw-text-gray-400 tw-text-center tw-leading-4 tw-text-sm">
        {{ name }}
      </h1>
    </div>
  </VCard>
</template>

<style scoped lang="scss">
.border-access {
  border: 1px solid;
  border-color: rgb(var(--v-theme-primary));
}
</style>
