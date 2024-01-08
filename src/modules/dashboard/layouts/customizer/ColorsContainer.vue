<script setup lang="ts">
import { getPrimariesColors } from "@/utils/getColors";
import ColorsCard from "./ColorsCard.vue";
import { usethemeCustomizer } from "@/stores/themeCustomizer";

const stores = usethemeCustomizer();

const setNewTheme = (theme: string) => {
  if (stores.isDark) {
    stores.setTheme(`DARK_${theme}`);
  } else {
    stores.setTheme(theme);
  }
};
</script>

<template>
  <div class="tw-grid tw-grid-cols-3 tw-gap-y-4 tw-gap-x-2 tw-mt-1 tw-px-2">
    <ColorsCard
      v-for="item in getPrimariesColors()"
      :color="item.color!"
      @click="setNewTheme(item.theme)"
      :name="item.theme!"
    />
  </div>
</template>

<style scoped></style>
