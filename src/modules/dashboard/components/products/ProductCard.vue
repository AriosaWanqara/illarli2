<script setup lang="ts">
import img from "@dashboard/assets/images/product.png";
import Status from "../shared/Status.vue";
import { statusEnum } from "@/const/statusEnum";
</script>

<template>
  <VCard max-width="300" variant="outlined" class="bg-white">
    <VImg height="200" :src="img" cover aspect-ratio="16/9">
      <div class="tw-w-full tw-h-full tw-px-2 tw-py-3">
        <div class="tw-w-min">
          <Status :message="'Disponible'" :type="statusEnum.SUCCESS" />
        </div>
      </div>
    </VImg>
    <VCardText class="py-0">
      <div class="tw-flex tw-justify-between tw-py-1">
        <div class="tw-flex tw-flex-col">
          <p class="tw-text-gray-400">category: Frutas</p>
          <p class="tw-font-semibold">Manzanas</p>
          <p class="tw-text-gray-400 tw-mt-2">12.03.2023</p>
        </div>
        <div class="tw-flex tw-justify-end tw-items-end">
          <h1 class="tw-font-semibold tw-text-lg">$99.99</h1>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped></style>
