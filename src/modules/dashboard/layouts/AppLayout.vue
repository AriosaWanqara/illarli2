<script setup lang="ts">
import Customizer from "../components/shared/Customizer.vue";
import MobileSideBar from "./mobileSidebar/MobileSideBar.vue";
import SideBar from "./sidebar/SideBar.vue";
import TopBar from "./topbar/TopBar.vue";
import "@dashboard/scss/style.scss";
</script>

<template>
  <div class="tw-relative">
    <Customizer />
    <SideBar />
    <MobileSideBar />
    <TopBar class="md:tw-mt-[2vh] tw-mt-0" />
    <VMain>
      <RouterView class="tw-px-[1vw] md:tw-mt-[2vh] tw-mt-0"></RouterView>
    </VMain>
  </div>
</template>

<style lang="scss">
@import "../scss/style.scss";
</style>
