<script setup lang="ts">
import Customizer from "./customizer/Customizer.vue";
import MobileSideBar from "./mobileSidebar/MobileSideBar.vue";
import SideBar from "./sidebar/SideBar.vue";
import TopBar from "./topbar/TopBar.vue";
import "@dashboard/scss/style.scss";
</script>

<template>
  <div class="tw-relative tw-h-full">
    <VMain class="tw-h-full">
      <router-view
        v-slot="{ Component }"
        class="tw-px-[1vw] md:tw-pt-[2vh] tw-pt-0"
      >
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </VMain>
    <Customizer />
    <SideBar />
    <MobileSideBar />
    <TopBar class="md:tw-pt-[2vh] tw-pt-0" />
  </div>
</template>

<style lang="scss">
@import "../scss/style.scss";
</style>
