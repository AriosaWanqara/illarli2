import { useUserStore } from "@/stores/userStore";
import { useBrowserLocation } from "@vueuse/core";
import axios from "axios";
import { ref } from "vue";
const location = useBrowserLocation();

const urlStart = "http://";

const urlDomain = ref("");

if (location.value.host) {
  if (location.value.host.includes(".")) {
    let sub = location.value.host.split(".")[0];
    if (sub != "illarli") {
      urlDomain.value = sub + ".";
    }
  }
}

// const baseURL = `${urlStart}${urlDomain.value}${import.meta.env.VITE_API_URL}`;
const baseURL = `http://novasolutions.illarli.local.com/api`;

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((req) => {
  const { token } = useUserStore();
  req.headers!.Authorization = `Bearer ${token}`;
  return req;
});

export default api;
