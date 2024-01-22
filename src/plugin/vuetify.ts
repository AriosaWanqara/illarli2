import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {
  BLUE_THEME,
  RED_THEME,
  PURPLE_THEME,
  GREEN_THEME,
  INDIGO_THEME,
  ORANGE_THEME,
} from "@/utils/LigthThemes";
import {
  DARK_BLUE_THEME,
  DARK_GREEN_THEME,
  DARK_INDIGO_THEME,
  DARK_ORANGE_THEME,
  DARK_PURPLE_THEME,
  DARK_RED_THEME,
} from "@/utils/DarkTheme";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "BLUE_THEME",
    themes: {
      BLUE_THEME,
      RED_THEME,
      PURPLE_THEME,
      GREEN_THEME,
      INDIGO_THEME,
      ORANGE_THEME,
      DARK_BLUE_THEME,
      DARK_GREEN_THEME,
      DARK_INDIGO_THEME,
      DARK_ORANGE_THEME,
      DARK_PURPLE_THEME,
      DARK_RED_THEME,
    },
  },
  defaults: {
    VCard: {
      rounded: "md",
    },
    VBtn: {
      density: "comfortable",
      variant: "tonal",
      color: "primary",
    },
    VDataTable: {
      density: "comfortable",
    },
    VTextField: {
      variant: "solo-filled",
      density: "compact",
      color: "primary",
      flat: true,
    },
    VAutocomplete: {
      variant: "solo-filled",
      density: "compact",
      color: "primary",
      flat: true,
    },
    VTextarea: {
      variant: "solo-filled",
      density: "comfortable",
      color: "primary",
      flat: true,
    },
    VSelect: {
      variant: "solo-filled",
      density: "compact",
      color: "primary",
      flat: true,
    },
    VListItem: {
      minHeight: "37px",
    },
    VTooltip: {
      location: "top",
    },
  },
});
