import { defineStore } from "pinia";
import { ref } from "vue";

export const usethemeCustomizer = defineStore(
  "theme",
  () => {
    const themeConfig = ref({
      cardHasShadow: true,
    });
    const theme = ref<string>("");
    const isDark = ref(false);
    const setTheme = (newTheme: string) => {
      theme.value = newTheme;
    };
    const setDark = (dark: boolean) => {
      isDark.value = dark;
    };
    return {
      theme,
      isDark,
      themeConfig,

      setTheme,
      setDark,
    };
  },
  { persist: true }
);
