<script setup lang="ts"></script>

<template>
  <div class="tw-flex tw-gap-x-3 tw-flex-wrap md:tw-flex-row tw-flex-col">
    <div class="md:tw-max-w-[446px] tw-h-min">
      <slot name="first-form" />
    </div>
    <div class="tw-flex-1">
      <slot name="second-form" />
    </div>
  </div>
</template>

<style scoped></style>
