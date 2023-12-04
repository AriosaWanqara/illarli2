<script setup lang="ts"></script>

<template>
  <VCard variant="flat">
    <VCardTitle>
      <div class="tw-flex tw-justify-between tw-px-2">
        <div class="">
          <slot name="left-action" />
        </div>
        <div>
          <slot name="right-action" />
        </div>
      </div>
    </VCardTitle>
    <VCardText>
      <slot></slot>
    </VCardText>
  </VCard>
</template>

<style scoped></style>
