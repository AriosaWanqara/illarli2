<script setup lang="ts">
import { RouterView } from "vue-router";
import { usethemeCustomizer } from "./stores/themeCustomizer";

const stores = usethemeCustomizer();
</script>

<template>
  <VLocaleProvider>
    <VApp :theme="stores.theme ? stores.theme : 'BLUE_THEME'">
      <RouterView />
    </VApp>
  </VLocaleProvider>
</template>

<style scoped></style>
