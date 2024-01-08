<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import ColorsContainer from "./ColorsContainer.vue";

const showCustomizer = ref(false);
</script>

<template>
  <div class="tw-fixed tw-bottom-3 tw-right-2 tw-z-10">
    <div class="">
      <VBtn color="primary" icon @click="showCustomizer = true">
        <Icon
          icon="material-symbols:settings-rounded"
          height="22"
          class="spin-animation"
        />
      </VBtn>
    </div>
    <Teleport to="body">
      <VNavigationDrawer
        v-model="showCustomizer"
        temporary
        location="right"
        width="400"
      >
        <ColorsContainer />
      </VNavigationDrawer>
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
  animation: spin 2.5s linear infinite;
}
</style>
