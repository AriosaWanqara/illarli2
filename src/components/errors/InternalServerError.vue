<script setup lang="ts">
import animationError500 from "@/assets/animations/animation-error-500.json";

import { Vue3Lottie } from "vue3-lottie";

interface props {
  height: number;
}

const porps = defineProps<props>();
</script>

<template>
  <Vue3Lottie :animation-data="animationError500" :height="porps.height" />
</template>

<style scoped></style>
