<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const isDark = ref(false);

const onThemeChange = (param: boolean) => {
  isDark.value = param;
};
</script>

<template>
  <div v-auto-animate>
    <div v-if="isDark" class="tw-cursor-pointer" @click="onThemeChange(false)">
      <Icon
        icon="material-symbols:dark-mode-outline-rounded"
        class="tw-text-gray-400"
        height="24"
      />
    </div>
    <div v-else class="tw-cursor-pointer" @click="onThemeChange(true)">
      <Icon
        icon="material-symbols:wb-sunny-outline-rounded"
        class="tw-text-yellow-400"
        height="24"
      />
    </div>
  </div>
</template>

<style scoped></style>
