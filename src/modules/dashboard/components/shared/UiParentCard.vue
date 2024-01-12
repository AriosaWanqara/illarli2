<script setup lang="ts">
import { usethemeCustomizer } from "@/stores/themeCustomizer";

const props = defineProps({
  title: String,
  isFlat: Boolean,
});

const store = usethemeCustomizer();
</script>

<template>
  <v-card :class="store.themeConfig.cardHasShadow ? 'box-card' : ''" flat>
    <v-card-item class="py-0 px-0">
      <div class="tw-flex tw-items-center tw-justify-between tw-p-6">
        <div class="tw-flex tw-items-center tw-gap-1">
          <slot name="actionBack"></slot>
          <v-card-title>
            <h2 class="tw-font-semibold title-1">{{ title }}</h2>
          </v-card-title>
        </div>
        <!-- <template v-slot:append> -->
        <slot name="action"></slot>
        <!-- </template> -->
      </div>
    </v-card-item>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
