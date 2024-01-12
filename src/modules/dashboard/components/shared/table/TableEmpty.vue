<script setup lang="ts">
interface props {
  hasError: boolean;
}

const props = defineProps<props>();
</script>

<template>
  <div class="tw-text-center">
    <p v-if="hasError" class="tw-font-semibold">Problemas en el servidor 🥲</p>
    <p v-else class="tw-font-semibold">No hay registros 🥲</p>
  </div>
</template>

<style scoped></style>
