<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
</script>

<template>
  <UIScaffold title="Transferencias">
    <template #left-action>Recibir Transferencias </template>
    <template #right-action>
      <RouterLink :to="{ name: 'transference-list' }">
        <VBtn> Back </VBtn>
      </RouterLink>
    </template>
    <template #default> </template>
  </UIScaffold>
</template>

<style scoped></style>
