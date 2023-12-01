<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import useLayoutState from "../../composable/useLayoutState";

const { layoutState } = useLayoutState();
const { smAndUp } = useDisplay();
</script>

<template>
  <v-app-bar
    :elevation="0"
    color="background"
    density="compact"
    class="shadow-none"
  >
    <div class="tw-flex tw-justify-between tw-w-full tw-pr-4">
      <div class="tw-flex tw-items-center tw-gap-2">
        <VBtn
          v-if="smAndUp"
          icon="mdi-menu"
          @click="layoutState.isRail = !layoutState.isRail"
        ></VBtn>
        <VBtn
          v-else
          icon="mdi-menu"
          @click="
            layoutState.isMobileNavDrawerShowing =
              !layoutState.isMobileNavDrawerShowing
          "
        ></VBtn>
        <h1>logo</h1>
      </div>
      <div class="">
        <p>account</p>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.shadow-none {
  box-shadow: none !important;
}
</style>
