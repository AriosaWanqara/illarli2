<script setup lang="ts">
import item1 from "@/assets/login-sliders/Slider-1.png";
import item2 from "@/assets/login-sliders/Slider-2.png";
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";

const items = ref([{ src: item1 }, { src: item2 }, { src: item1 }]);
const el = ref(null);
const { height } = useElementSize(el);
const imageShowed = ref(0);

const onCarouselUpdate = (activeImage: any) => {
  imageShowed.value = activeImage;
};
</script>
<template>
  <div
    class="tw-w-full tw-h-full tw-bg-[#F7FAFC] tw-flex-col tw-px-3 tw-py-14 tw-items-center"
  >
    <header class="tw-w-full">
      <h1 class="tw-font-semibold tw-text-gray-500 tw-font-Noto">
        Bienvenido a <span class="text-bg-primary">Illarli</span>
      </h1>
      <p class="tw-text-gray-400">
        Inicia sesión para gestionar tus facturas de manera inteligente.
      </p>
      <div class="tw-mt-2 tw-flex tw-gap-2">
        <div
          class="tw-h-[6px] tw-w-[6px] bg-primary tw-rounded-full tw-transition-all tw-duration-200"
          :class="index == imageShowed ? 'tw-scale-150' : ''"
          v-for="(dot, index) in items"
        ></div>
      </div>
    </header>
    <div class="tw-w-full tw-flex-1" ref="el">
      <v-carousel
        hide-delimiters
        :show-arrows="false"
        cycle
        :height="height"
        @update:model-value="onCarouselUpdate"
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <footer class="tw-text-center text-bg-primary tw-font-semibold">
      <h1>Empieza a facturar con illarli</h1>
      <h1>de manera eficiente</h1>
    </footer>
  </div>
</template>

<style scoped></style>
