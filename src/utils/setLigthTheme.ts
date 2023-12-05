import { usethemeCustomizer } from "@/stores/themeCustomizer";

const stores = usethemeCustomizer();

export const setLigthTheme = () => {
  switch (stores.theme) {
    case "DARK_ORANGE_THEME":
      stores.setTheme("ORANGE_THEME");
      break;
    case "DARK_BLUE_THEME":
      stores.setTheme("BLUE_THEME");
      break;
    case "DARK_RED_THEME":
      stores.setTheme("RED_THEME");
      break;
    case "DARK_PURPLE_THEME":
      stores.setTheme("PURPLE_THEME");
      break;
    case "DARK_GREEN_THEME":
      stores.setTheme("GREEN_THEME");
      break;
    case "DARK_INDIGO_THEME":
      stores.setTheme("INDIGO_THEME");
      break;
    default:
      stores.setTheme("ORANGE_THEME");
      break;
  }
};
