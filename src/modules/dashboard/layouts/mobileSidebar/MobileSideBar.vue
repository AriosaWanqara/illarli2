<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import useLayoutState from "../../composable/useLayoutState";

const { mdAndDown } = useDisplay();
const { layoutState } = useLayoutState();

const admins = [
  ["Management", "mdi-account-multiple-outline"],
  ["Settings", "mdi-cog-outline"],
];
const cruds = [
  ["Create", "mdi-plus-outline"],
  ["Read", "mdi-file-outline"],
  ["Update", "mdi-update"],
  ["Delete", "mdi-delete"],
];
</script>

<template>
  <VNavigationDrawer
    v-model="layoutState.isMobileNavDrawerShowing"
    floating
    temporary
    :mobile-breakpoint="600"
    rail-width="80"
  >
    <v-list>
      <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="Users"
          ></v-list-item>
        </template>

        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Admin"></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          ></v-list-item>
        </v-list-group>

        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Actions"></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            :value="title"
            :title="title"
            :prepend-icon="icon"
          ></v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </VNavigationDrawer>
</template>

<style scoped></style>
