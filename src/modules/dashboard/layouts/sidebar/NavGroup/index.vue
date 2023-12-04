<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({ item: Object });
</script>

<template>
  <v-list-subheader
    class="smallCap tw-uppercase tw-font-semibold tw-relative"
    v-if="props.item.header != ' '"
  >
    <!-- <Icon
      icon="ph:dots-three-bold"
      height="24"
      class="mini-icon tw-absolute tw-right-[29%] tw-text-white"
    /> -->
    <span class="mini-text">{{ props.item.header }}</span>
  </v-list-subheader>
  <VDivider v-else></VDivider>
</template>
