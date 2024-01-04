<script setup lang="ts">
import UiParentCard from "@dashboard/components/shared/UiParentCard.vue";
const props = defineProps({
  title: String,
  isFlat: Boolean,
});
</script>

<template>
  <div>
    <UiParentCard :title="props.title" :isFlat="isFlat">
      <template v-slot:actionBack>
        <slot name="actionBack"></slot>
      </template>
      <template v-slot:action>
        <slot name="action"></slot>
      </template>
      <slot />
    </UiParentCard>
  </div>
</template>
