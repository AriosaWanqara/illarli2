<script setup lang="ts">
import { usethemeCustomizer } from "@/stores/themeCustomizer";
import { Icon } from "@iconify/vue";

const store = usethemeCustomizer();
</script>

<template>
  <div class="tw-flex tw-gap-3">
    <VCard variant="outlined" @click="store.themeConfig.cardHasShadow = false">
      <VCardItem
        class="tw-flex tw-justify-center tw-items-center tw-relative"
        :class="
          store.themeConfig.cardHasShadow == false
            ? 'tw-font-semibold selected'
            : ''
        "
        v-auto-animate
      >
        <div
          class="tw-absolute tw-right-0 tw-top-0 tw-p-2"
          v-if="store.themeConfig.cardHasShadow == false"
        >
          <Icon
            icon="material-symbols:check-circle-outline-rounded"
            height="18"
          />
        </div>
        <div class="tw-flex tw-gap-2">
          <Icon icon="fluent:border-outside-thick-24-filled" height="18" />
          <p>Borde</p>
        </div>
      </VCardItem>
    </VCard>
    <VCard variant="outlined" @click="store.themeConfig.cardHasShadow = true">
      <VCardItem
        class="tw-flex tw-justify-center tw-items-center tw-relative"
        :class="
          store.themeConfig.cardHasShadow ? ' tw-font-semibold selected' : ''
        "
        v-auto-animate
      >
        <div
          class="tw-absolute tw-right-0 tw-top-0 tw-p-2"
          v-if="store.themeConfig.cardHasShadow"
        >
          <Icon
            icon="material-symbols:check-circle-outline-rounded"
            height="18"
          />
        </div>
        <div class="tw-flex tw-gap-2">
          <Icon icon="material-symbols:ev-shadow-add" height="18" />
          <p>Sombras</p>
        </div>
      </VCardItem>
    </VCard>
  </div>
</template>

<style scoped></style>
