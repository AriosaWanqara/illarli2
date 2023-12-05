<script setup lang="ts">
import { ref } from "vue";

const showCustomizer = ref(false);
</script>

<template>
  <div class="tw-fixed tw-bottom-3 tw-right-2 tw-z-10">
    <div class="spin-animation">
      <VBtn
        color="primary"
        icon="mdi-cog"
        @click="showCustomizer = true"
      ></VBtn>
    </div>
    <Teleport to="body">
      <VNavigationDrawer
        v-model="showCustomizer"
        temporary
        location="right"
      ></VNavigationDrawer>
    </Teleport>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.spin-animation {
  animation: spin 2s linear infinite;
}
</style>
