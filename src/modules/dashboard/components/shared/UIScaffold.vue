<script setup lang="ts"></script>

<template>
  <div class="">
    <VCard variant="flat">
      <VCardTitle>
        <div class="tw-flex tw-justify-between tw-px-2">
          <div class="">
            <slot name="left-action" />
          </div>
          <div class="tw-flex tw-gap-1">
            <slot name="right-action" />
          </div>
        </div>
      </VCardTitle>
      <VCardText>
        <slot></slot>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped></style>
