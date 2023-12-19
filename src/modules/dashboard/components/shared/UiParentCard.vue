<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

// ===============================|| Ui Parent
Card||=============================== //
<template>
  <v-card elevation="0" variant="flat">
    <v-card-item>
      <div class="tw-flex tw-align-center tw-justify-between">
        <div class="tw-flex tw-align-center">
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
