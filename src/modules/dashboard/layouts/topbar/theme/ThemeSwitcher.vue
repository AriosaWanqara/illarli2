<script setup lang="ts">
import { usethemeCustomizer } from "@/stores/themeCustomizer";
import { setDarkTheme } from "@/utils/setDarkTheme";
import { setLigthTheme } from "@/utils/setLigthTheme";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const isDark = ref(false);

const onThemeChange = (param: boolean) => {
  isDark.value = param;
};

const customizer = usethemeCustomizer();
</script>

<template>
  <div v-auto-animate>
    <div
      v-if="customizer.isDark"
      class="tw-cursor-pointer"
      @click="onThemeChange(false), setLigthTheme()"
    >
      <Icon
        icon="material-symbols:dark-mode-outline-rounded"
        class="tw-text-gray-200"
        height="24"
      />
    </div>
    <div
      v-else
      class="tw-cursor-pointer"
      @click="onThemeChange(true), setDarkTheme()"
    >
      <Icon
        icon="material-symbols:wb-sunny-outline-rounded"
        class="tw-text-yellow-400"
        height="24"
      />
    </div>
  </div>
</template>

<style scoped></style>
