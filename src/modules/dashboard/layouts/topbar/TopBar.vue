<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import useLayoutState from "../../composable/useLayoutState";
import Profile from "./account/Profile.vue";
import ThemeSwitcher from "./theme/ThemeSwitcher.vue";
import Notifications from "./notification/Notifications.vue";
import { Icon } from "@iconify/vue";

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
          color="textPrimary"
          icon="mdi-menu"
          @click="layoutState.isRail = !layoutState.isRail"
        ></VBtn>
        <VBtn
          v-else
          icon="mdi-menu"
          color="textPrimary"
          @click="
            layoutState.isMobileNavDrawerShowing =
              !layoutState.isMobileNavDrawerShowing
          "
        ></VBtn>
        <h1>logo</h1>
      </div>
      <div class="tw-flex tw-gap-4 tw-items-center">
        <RouterLink :to="{ name: 'pos-home' }">
          <div
            class="tw-flex tw-gap-1 tw-py-1 tw-border-[1px] tw-border-gray-300 tw-px-2 tw-rounded-md"
          >
            <Icon icon="solar:shop-2-linear" />
            <p class="textPrimary tw-text-xs">POS</p>
          </div>
        </RouterLink>
        <Notifications />
        <ThemeSwitcher />
        <Profile />
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.shadow-none {
  box-shadow: none !important;
}
</style>
