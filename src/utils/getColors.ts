import { usethemeCustomizer } from "@/stores/themeCustomizer";
import {
  BLUE_THEME,
  GREEN_THEME,
  INDIGO_THEME,
  ORANGE_THEME,
  PURPLE_THEME,
  RED_THEME,
} from "./LigthThemes";
import {
  DARK_BLUE_THEME,
  DARK_GREEN_THEME,
  DARK_INDIGO_THEME,
  DARK_ORANGE_THEME,
  DARK_PURPLE_THEME,
  DARK_RED_THEME,
} from "./DarkTheme";

const stores = usethemeCustomizer();

export const getPrimaryColor = () => {
  if (stores.isDark) {
    switch (stores.theme) {
      case "DARK_RED_THEME":
        return DARK_RED_THEME.colors.primary;
      case "DARK_PURPLE_THEME":
        return DARK_PURPLE_THEME.colors.primary;
      case "DARK_GREEN_THEME":
        return DARK_GREEN_THEME.colors.primary;
      case "DARK_INDIGO_THEME":
        return DARK_INDIGO_THEME.colors.primary;
      case "DARK_ORANGE_THEME":
        return DARK_ORANGE_THEME.colors.primary;
      default:
        return DARK_BLUE_THEME.colors.primary;
    }
  } else {
    switch (stores.theme) {
      case "RED_THEME":
        return RED_THEME.colors.primary;
      case "PURPLE_THEME":
        return PURPLE_THEME.colors.primary;
      case "GREEN_THEME":
        return GREEN_THEME.colors.primary;
      case "INDIGO_THEME":
        return INDIGO_THEME.colors.primary;
      case "ORANGE_THEME":
        return ORANGE_THEME.colors.primary;
      default:
        return BLUE_THEME.colors.primary;
    }
  }
};

export const getPrimariesColors = () => {
  return [
    { color: RED_THEME.colors.primary, theme: RED_THEME.name },
    { color: BLUE_THEME.colors.primary, theme: BLUE_THEME.name },
    { color: GREEN_THEME.colors.primary, theme: GREEN_THEME.name },
    { color: INDIGO_THEME.colors.primary, theme: INDIGO_THEME.name },
    { color: ORANGE_THEME.colors.primary, theme: ORANGE_THEME.name },
    { color: PURPLE_THEME.colors.primary, theme: PURPLE_THEME.name },
  ];
};
