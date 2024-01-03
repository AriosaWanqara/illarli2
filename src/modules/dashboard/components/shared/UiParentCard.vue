<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

// ===============================|| Ui Parent
Card||=============================== //
<template>
  <v-card elevation="0" variant="flat">
    <v-card-item class="py-0">
      <div class="tw-flex tw-items-center tw-justify-between tw-py-3">
        <div class="tw-flex tw-items-center tw-gap-1">
          <slot name="actionBack"></slot>
          <v-card-title class="text-h5">{{ title }}</v-card-title>
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
