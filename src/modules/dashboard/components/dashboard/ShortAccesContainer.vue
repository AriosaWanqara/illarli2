<script setup lang="ts">
import ShortAccess from "./ShortAccess.vue";
import ic_reports from "@dashboard/assets/icons/ic_reports.svg";

const shortAccess = [
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
  { image: ic_reports, name: "Reportes", to: "product-list" },
];
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-flex-wrap">
    <ShortAccess
      v-for="shortAcces in shortAccess"
      :image="shortAcces.image"
      :name="shortAcces.name"
      :to="shortAcces.to"
    />
  </div>
</template>

<style scoped></style>
