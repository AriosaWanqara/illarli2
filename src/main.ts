import "./assets/main.css";
import "./scss/style.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { abilitiesPlugin } from "@casl/vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import Vue3EasyDataTable from "vue3-easy-data-table";
import vuetify from "./plugin/vuetify";
import VueApexCharts from "vue3-apexcharts";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Vue3Lottie from "vue3-lottie";

import App from "./App.vue";
import router from "./router";
import ability from "./service/ability";

const app = createApp(App);
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
});
app.use(VueApexCharts);
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

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(Vue3Lottie);
app.use(router);
app.use(autoAnimatePlugin);

app.use(vuetify).mount("#app");
