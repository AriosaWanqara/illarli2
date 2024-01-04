<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import useLayoutState from "../../composable/useLayoutState";
import Profile from "./account/Profile.vue";
import ThemeSwitcher from "./theme/ThemeSwitcher.vue";
import Notifications from "./notification/Notifications.vue";
import { Icon } from "@iconify/vue";
import { usethemeCustomizer } from "@/stores/themeCustomizer";

const { layoutState } = useLayoutState();
const { smAndUp, xl } = useDisplay();
const { setTheme } = usethemeCustomizer();
</script>

<template>
  <v-app-bar
    :elevation="0"
    color="background"
    :density="xl ? 'default' : 'compact'"
    class="shadow-none"
  >
    <div
      class="tw-flex tw-justify-between tw-w-full tw-px-[1vw] md:tw-items-start tw-items-center tw-h-full tw-pt-1"
    >
      <div class="tw-flex tw-items-center tw-gap-2">
        <VBtn
          v-if="smAndUp"
          color="textPrimary"
          icon
          @click="layoutState.isRail = !layoutState.isRail"
        >
          <Icon icon="solar:list-outline" height="24" />
        </VBtn>
        <VBtn
          v-else
          color="textPrimary"
          icon
          @click="
            layoutState.isMobileNavDrawerShowing =
              !layoutState.isMobileNavDrawerShowing
          "
        >
          <Icon icon="solar:list-outline" height="24" />
        </VBtn>
        <h1 @click="setTheme('BLUE_THEME')">logo</h1>
      </div>
      <div class="tw-flex tw-gap-5 tw-items-center">
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

        <VDivider vertical />

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
