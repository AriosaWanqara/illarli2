<script setup lang="ts">
import { computed } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

interface props {
  visibility: boolean;
}

const props = defineProps<props>();
const emits = defineEmits(["close"]);
const visibility = computed({
  get: () => props.visibility,
  set: (val) => emits("close", val),
});
</script>

<template>
  <VNavigationDrawer
    v-model="visibility"
    width="320"
    temporary
    location="right"
  >
    <div class="tw-px-4 tw-py-4 tw-flex tw-flex-col tw-h-full">
      <header></header>
      <PerfectScrollbar class="tw-flex-1"> </PerfectScrollbar>
    </div>
  </VNavigationDrawer>
</template>

<style scoped></style>
