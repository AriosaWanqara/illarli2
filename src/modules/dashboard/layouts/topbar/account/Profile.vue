<script setup lang="ts">
import manAvatar from "@dashboard/assets/images/man-avatar.svg";
import AccountMenu from "./AccountMenu.vue";
</script>

<template>
  <div class="tw-flex tw-gap-1 tw-items-center">
    <VMenu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <VAvatar
          :image="manAvatar"
          class="tw-cursor-pointer"
          size="40"
          v-bind="props"
        />
      </template>
      <AccountMenu />
    </VMenu>
    <div class="tw-flex tw-flex-col">
      <p class="tw-m-0 tw-leading-4 tw-text-sm tw-font-semibold">
        Jorge Ariosa
      </p>
      <p class="tw-text-gray-400 tw-m-0 tw-leading-5 tw-text-sm">Admin</p>
    </div>
  </div>
</template>

<style scoped></style>
