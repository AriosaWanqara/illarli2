<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    title: "Item #1",
    value: 1,
  },
  {
    title: "Item #2",
    value: 2,
  },
  {
    title: "Item #3",
    value: 3,
  },
]);
</script>

<template>
  <VCard>
    <VCardText>
      <v-list :items="items"></v-list>
    </VCardText>
  </VCard>
</template>

<style scoped></style>
