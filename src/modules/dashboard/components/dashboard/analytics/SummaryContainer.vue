<script setup lang="ts">
import ResumenCard from "./ResumenCard.vue";
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-2">
    <h1 class="tw-font-semibold tw-font-Montserrat">Informacion importante</h1>
    <div class="summary-container tw-w-full">
      <ResumenCard
        :name="'INGRESOS DE HOY'"
        :percentage="12"
        :value="2345"
        :chart-data="[35, 37, 41, 45, 40, 45, 40, 41, 45, 40, 45]"
      />
      <ResumenCard
        :name="'INGRESOS DE AYER'"
        :percentage="5"
        :value="120"
        :chart-data="[35, 37, 41, 45, 40, 45, 40, 41, 45, 40, 41]"
      />
      <ResumenCard
        :name="'INGRESOS DE HOY'"
        :percentage="12"
        :value="1000"
        :chart-data="[35, 37, 41, 45, 40, 41, 40, 41, 45, 42, 45]"
      />
      <ResumenCard
        :name="'INGRESOS DE HOY'"
        :percentage="12"
        :value="2345"
        :chart-data="[35, 37, 41, 45, 40, 45, 40, 41, 45, 40, 45]"
      />
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
</style>
