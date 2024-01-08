<script setup lang="ts">
import { RouterView } from "vue-router";
import { usethemeCustomizer } from "./stores/themeCustomizer";

const stores = usethemeCustomizer();
if (!stores.theme) {
  stores.setTheme("BLUE_THEME");
}
</script>

<template>
  <VLocaleProvider>
    <VApp
      :theme="stores.theme ? stores.theme : 'BLUE_THEME'"
      :class="stores.isDark ? 'dark' : 'ligth'"
    >
      <RouterView />
    </VApp>
  </VLocaleProvider>
</template>

<style scoped></style>
