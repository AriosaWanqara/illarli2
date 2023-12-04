<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const chartOptions = computed(() => {
  return {
    series: [
      {
        name: "Monthly Sales",
        data: [35, 37, 41, 45, 40, 45, 40, 41, 45, 40, 45],
      },
    ],

    colors: ["#1e4db7"],
    fill: {
      colors: "#1e4db7",
      type: "gradient",
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    chart: {
      type: "area",
      height: 45,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: `inherit`,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      theme: "dark",
    },
  };
});
</script>

<template>
  <VCard max-width="300" variant="flat">
    <div class="tw-flex tw-flex-col tw-px-3 tw-py-3">
      <div class="tw-flex tw-gap-1 tw-items-center tw-text-ellipsis">
        <div class="tw-bg-blue-300 tw-text-white tw-p-1 tw-rounded-md">
          <Icon icon="material-symbols:account-balance-wallet" />
        </div>
        <p class="tw-text-gray-500 tw-text-sm">INGRESOS DE HOY</p>
      </div>
      <div class="tw-flex tw-flex-1">
        <div
          class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-items-start tw-gap-4 tw-mt-3"
        >
          <h1 class="tw-text-3xl tw-font-semibold">$2313</h1>
          <div class="tw-flex tw-gap-1 tw-items-center">
            <Icon icon="ic:baseline-trending-up" class="tw-text-green-500" />
            <p class="tw-text-sm tw-text-green-500 tw-font-semibold">+12%</p>
            <p class="tw-text-xs tw-text-gray-400">VC ayer</p>
          </div>
        </div>
        <div class="tw-flex tw-flex-1 tw-justify-start tw-items-start">
          <apexchart
            type="area"
            height="55px"
            :options="chartOptions"
            :series="chartOptions.series"
          ></apexchart>
        </div>
      </div>
    </div>
  </VCard>
</template>

<style scoped></style>
