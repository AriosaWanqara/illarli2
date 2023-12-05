<script setup lang="ts">
import { Icon } from "@iconify/vue";
import NotificationsMenu from "./NotificationMenu.vue";
</script>

<template>
  <VMenu>
    <template v-slot:activator="{ props }">
      <VBadge
        color="primary"
        :content="2"
        dot
        class="tw-cursor-pointer"
        v-bind="props"
      >
        <Icon icon="material-symbols:notifications-outline" height="24" />
      </VBadge>
    </template>
    <NotificationsMenu />
  </VMenu>
</template>

<style scoped></style>
