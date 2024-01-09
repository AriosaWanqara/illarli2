<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import AdjustTableList from "../../components/adjust/AdjustTableList.vue";
</script>

<template>
  <ViewScaffold>
    <template #default>
      <AdjustTableList />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
