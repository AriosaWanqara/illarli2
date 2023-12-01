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
      variant: "outlined",
      density: "compact",
      color: "primary",
      flat: true,
    },
    VTextarea: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VSelect: {
      variant: "outlined",
      density: "compact",
      color: "primary",
    },
    VListItem: {
      minHeight: "37px",
    },
    VTooltip: {
      location: "top",
    },
  },
});
