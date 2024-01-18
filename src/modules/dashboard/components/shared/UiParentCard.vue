<script setup lang="ts">
import { usethemeCustomizer } from "@/stores/themeCustomizer";
import { useSlots } from "vue";

const props = defineProps({
  title: String,
  isFlat: Boolean,
});

const store = usethemeCustomizer();
const slots = useSlots();
const hasSlot = (name: string) => {
  return !!slots[name];
};
</script>

<template>
  <v-card :class="store.themeConfig.cardHasShadow ? 'box-card' : ''" flat>
    <v-card-item
      class="py-0 px-0"
      v-if="hasSlot('actionBack') || hasSlot('action')"
    >
      <div class="tw-flex tw-items-center tw-justify-between tw-p-6">
        <div class="tw-flex tw-items-center tw-gap-1">
          <slot name="actionBack"></slot>
          <v-card-title>
            <h2 class="tw-font-semibold title-1">{{ title }}</h2>
          </v-card-title>
        </div>
        <slot name="action"></slot>
      </div>
    </v-card-item>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
