<script setup lang="ts">
import MobileSideBar from "./mobileSidebar/MobileSideBar.vue";
import SideBar from "./sidebar/SideBar.vue";
import TopBar from "./topbar/TopBar.vue";
import "@dashboard/scss/style.scss";
</script>

<template>
  <SideBar />
  <MobileSideBar />
  <TopBar />
  <VMain>
    <RouterView></RouterView>
  </VMain>
</template>

<style lang="scss">
@import "../scss/style.scss";
</style>
