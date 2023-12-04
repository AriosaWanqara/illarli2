<script setup lang="ts">
import ic_reports from "@dashboard/assets/icons/ic_reports.svg";
</script>

<template>
  <VCard max-width="130" class="tw-cursor-pointer" variant="flat">
    <div
      class="tw-w-full tw-flex tw-justify-center tw-items-center tw-py-4 tw-flex-col tw-px-1"
    >
      <img :src="ic_reports" alt="" />
      <h1 class="tw-text-gray-400 tw-text-center tw-leading-4 tw-text-sm">
        reportes
      </h1>
    </div>
  </VCard>
</template>

<style scoped></style>
