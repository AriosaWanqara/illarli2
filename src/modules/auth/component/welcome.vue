<script setup lang="ts">
import item1 from "@/assets/login-sliders/Slider-1.png";
import item2 from "@/assets/login-sliders/Slider-2.png";
import { ref } from "vue";

const items = ref([{ src: item1 }, { src: item2 }, { src: item1 }]);
</script>
<template>
  <div
    class="tw-w-full tw-h-full tw-bg-[#F7FAFC] tw-flex-col tw-px-3 tw-py-14 tw-items-center"
  >
    <header class="tw-w-full">
      <h1>Bienvenido a illarli</h1>
      <p>Inicia sesión para gestionar tus facturas de manera inteligente.</p>
      <div class="tw-mt-2 tw-flex tw-gap-2">
        <div
          class="tw-h-[6px] tw-w-[6px] bg-primary tw-rounded-full"
          v-for="dot in items"
        ></div>
      </div>
    </header>
    <div class="tw-w-[50%] tw-flex-1">
      <!-- <v-carousel hide-delimiters :show-arrows="false" cycle>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel> -->
    </div>
    <footer class="tw-text-center text-bg-primary tw-font-semibold">
      <h1>Empieza a facturar con illarli</h1>
      <h1>de manera eficiente</h1>
    </footer>
  </div>
</template>

<style scoped></style>
