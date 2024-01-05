<script setup lang="ts"></script>

<template>
  <div class="tw-flex tw-gap-2 tw-pt-2 tw-flex-col-reverse md:tw-flex-row">
    <div class="tw-max-w-[400px] tw-hidden md:tw-block">
      <slot name="form" />
    </div>
    <div class="tw-flex-1">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
