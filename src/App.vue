<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <VLocaleProvider>
    <VApp theme="INDIGO_THEME">
      <RouterView />
    </VApp>
  </VLocaleProvider>
</template>

<style scoped></style>
