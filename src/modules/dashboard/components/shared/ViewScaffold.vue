<script setup lang="ts">
import UiParentCard from "@dashboard/components/shared/UiParentCard.vue";
import { useSlots } from "vue";
const props = defineProps({
  title: String,
  isFlat: Boolean,
});
const slots = useSlots();
const hasSlot = (name: string) => {
  return !!slots[name];
};
</script>

<template>
  <div>
    <UiParentCard :title="props.title" :isFlat="isFlat">
      <template v-if="hasSlot('actionBack')" #actionBack>
        <slot name="actionBack" v-if="hasSlot('actionBack')"></slot>
      </template>
      <template v-if="hasSlot('action')" #action>
        <slot name="action" v-if="hasSlot('action')"></slot>
      </template>
      <slot />
    </UiParentCard>
  </div>
</template>
