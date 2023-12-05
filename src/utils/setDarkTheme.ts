import { usethemeCustomizer } from "@/stores/themeCustomizer";

const stores = usethemeCustomizer();

export const setDarkTheme = () => {
  switch (stores.theme) {
    case "ORANGE_THEME":
      stores.setTheme("DARK_ORANGE_THEME");
      break;
    case "BLUE_THEME":
      stores.setTheme("DARK_BLUE_THEME");
      break;
    case "RED_THEME":
      stores.setTheme("DARK_RED_THEME");
      break;
    case "PURPLE_THEME":
      stores.setTheme("DARK_PURPLE_THEME");
      break;
    case "GREEN_THEME":
      stores.setTheme("DARK_GREEN_THEME");
      break;
    case "INDIGO_THEME":
      stores.setTheme("DARK_INDIGO_THEME");
      break;
    default:
      stores.setTheme("DARK_ORANGE_THEME");
      break;
  }
};
