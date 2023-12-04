<script setup lang="ts">
import type { statusEnum } from "@/const/statusEnum";

interface props {
  type: statusEnum;
  message: string;
}

const { message, type } = defineProps<props>();
</script>

<template>
  <div>
    <p :class="type" class="tw-text-xs">{{ message }}</p>
  </div>
</template>

<style scoped></style>
