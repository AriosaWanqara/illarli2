import "./assets/main.css";
import "./scss/style.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { abilitiesPlugin } from "@casl/vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import Vue3EasyDataTable from "vue3-easy-data-table";
import vuetify from "./plugin/vuetify";

import App from "./App.vue";
import router from "./router";
import ability from "./service/ability";

const app = createApp(App);
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
});
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
});

app.component("EasyDataTable", Vue3EasyDataTable);

app.use(createPinia());
app.use(router);

app.use(vuetify).mount("#app");
