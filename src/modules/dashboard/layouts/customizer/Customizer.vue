<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import CardStyleSelector from "./CardStyleSelector.vue";
import ColorsContainer from "./ColorsContainer.vue";

const showCustomizer = ref(false);
</script>

<template>
  <div class="tw-fixed tw-bottom-3 tw-right-2 tw-z-10">
    <div class="">
      <VBtn
        color="primary"
        icon
        @click="showCustomizer = true"
        density="default"
      >
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
        <div class="tw-h-full tw-flex tw-flex-col">
          <div
            class="tw-py-7 tw-flex tw-justify-between tw-items-center tw-px-4"
          >
            <h1 class="tw-font-semibold">Configuraciones</h1>
            <VBtn
              icon="mdi-close"
              variant="text"
              density="compact"
              @click="showCustomizer = false"
            ></VBtn>
          </div>
          <VDivider />
          <PerfectScrollbar
            class="tw-flex-1 tw-flex tw-flex-col tw-gap-10 tw-px-4 tw-mt-2"
          >
            <div class="tw-flex tw-flex-col tw-gap-4">
              <h1 class="tw-text-gray-400">Color primario</h1>
              <ColorsContainer />
            </div>
            <div class="tw-flex tw-flex-col tw-gap-4">
              <h1 class="tw-text-gray-400">Card Style</h1>
              <CardStyleSelector />
            </div>
          </PerfectScrollbar>
        </div>
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
