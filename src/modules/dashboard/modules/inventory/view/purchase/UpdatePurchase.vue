<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
</script>

<template>
  <UIScaffold title="Compras">
    <template #left-action>
      <h1>Actualizar Compras</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'purchase-list' }">
        <VBtn color="success">back</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <h1>Form</h1>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
