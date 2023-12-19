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
    <span class="mini-text text-white">{{ props.item.header }}</span>
  </v-list-subheader>
  <div class="tw-w-full tw-px-1" v-else>
    <VDivider></VDivider>
  </div>
</template>
