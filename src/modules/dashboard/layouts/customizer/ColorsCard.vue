<script setup lang="ts">
import { usethemeCustomizer } from "@/stores/themeCustomizer";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

interface props {
  color: string;
  name: string;
}

const { color, name } = defineProps<props>();
const stores = usethemeCustomizer();

const themeName = computed(() => stores.theme.replace("DARK_", ""));
</script>

<template>
  <VCard flat variant="outlined">
    <VCardText class="tw-flex tw-justify-center tw-cursor-pointer">
      <div
        class="tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-justify-center tw-items-center"
        :style="`background-color: ${color};`"
      >
        <Icon
          v-if="name == themeName"
          icon="material-symbols:check-small-rounded"
          class="tw-text-white"
          height="24"
        />
      </div>
    </VCardText>
  </VCard>
</template>

<!-- background-color: ${color}; -->

<style scoped></style>
