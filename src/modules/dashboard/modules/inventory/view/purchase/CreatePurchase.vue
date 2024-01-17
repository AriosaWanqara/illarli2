<script setup lang="ts">
import ButtonFileUploader from "@/modules/dashboard/components/shared/ButtonFileUploader.vue";
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";
import ProductGeneralInfo from "../../../products/component/product/create/ProductGeneralInfo.vue";
import type { ComboProduct } from "../../../products/models/products/ComboProduct";

const fileName = ref();

const onFileChanged = (e: any) => {
  console.log(e);
  fileName.value = e.name;
};
const combo = ref<ComboProduct>({
  categoriesId: [] as string[],
} as ComboProduct);
</script>

<template>
  <ViewScaffold title="Crear compra 2">
    <template #action>
      <div class="tw-flex tw-gap-3 tw-items-center" v-auto-animate>
        <p class="tw-font-semibold tw-text-green-500" v-if="fileName">
          {{ fileName }}
        </p>
        <ButtonFileUploader
          append-icon=""
          :button-text="'Subir xml'"
          :color="'success'"
          :is-button-loading="false"
          accept=".xml"
          prepend-icon="mdi-plus"
          variant="tonal"
          @file-changed="onFileChanged"
        />
      </div>
    </template>
    <template #default>
      <ProductGeneralInfo :product="combo" />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
