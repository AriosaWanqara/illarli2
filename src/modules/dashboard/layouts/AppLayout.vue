<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mdAndDown } = useDisplay();

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
    floating
    :mobile-breakpoint="700"
    class="tw-p-3"
    rail-width="80"
    order="1"
    expand-on-hover
    color="background"
    :rail="mdAndDown"
  >
    <div
      class="tw-w-full tw-h-full tw-bg-blue-900 tw-rounded-md tw-overflow-hidden"
    >
      <v-list bg-color="primary">
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
    </div>
  </VNavigationDrawer>
  <VMain>
    <RouterView></RouterView>
  </VMain>
</template>

<style scoped></style>
