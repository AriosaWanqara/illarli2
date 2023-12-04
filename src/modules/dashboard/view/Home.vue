<script setup lang="ts">
import type { Header, Item } from "vue3-easy-data-table";
import ResumenCard from "../components/ResumenCard.vue";
import ShortAccess from "../components/ShortAccess.vue";
import UIScaffold from "../components/shared/UIScaffold.vue";
import { ref } from "vue";

const headers: Header[] = [
  { text: "primero", value: "f" },
  { text: "primero1", value: "f1" },
  { text: "primero2", value: "f2" },
  { text: "primero2", value: "f3" },
];

const items = [
  { f: "a", f1: "b", f2: "c", f3: "c" },
  { f: "ax", f1: "b", f2: "c", f3: "c" },
  { f: "asd", f1: "b", f2: "c", f3: "c" },
  { f: "asa", f1: "b", f2: "c", f3: "c" },
  { f: "av", f1: "b", f2: "c", f3: "c" },
  { f: "aa", f1: "b", f2: "c", f3: "c" },
];

const itemsSelected = ref<Item[]>([]);
</script>

<template>
  <div>
    <ResumenCard />
    <br />
    <ShortAccess />
    <br />
    <UIScaffold>
      <template #left-action>
        <h1>asd</h1>
      </template>
      <template #right-action>
        <h2>asd</h2>
      </template>
      <EasyDataTable
        v-model:items-selected="itemsSelected"
        :headers="headers"
        :theme-color="'#f48225'"
        :items="items"
        alternating
        class="customize-table"
      />
    </UIScaffold>
  </div>
</template>

<style scoped></style>
