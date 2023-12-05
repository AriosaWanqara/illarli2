import { defineStore } from "pinia";
import { ref } from "vue";

export const usethemeCustomizer = defineStore(
  "theme",
  () => {
    const theme = ref<string>("");
    const setTheme = (newTheme: string) => {
      theme.value = newTheme;
    };
    return {
      theme,

      setTheme,
    };
  },
  { persist: true }
);
