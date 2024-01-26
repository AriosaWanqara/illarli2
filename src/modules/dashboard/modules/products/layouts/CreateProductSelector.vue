<script setup lang="ts">
import FileUpload from "@/modules/dashboard/components/shared/FileUpload.vue";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import { smallFormFileUploadTempla } from "@/modules/dashboard/const/FileUploadTemplate";
import combo from "@dashboard/assets/images/ic_combo.png";
import standar from "@dashboard/assets/images/ic_standar.png";
import subproduct from "@dashboard/assets/images/ic_subproduct.png";
import productBanerImg from "@dashboard/assets/images/product-creat.png";
import { ref } from "vue";
import ProductTypeCard from "../component/product/ProductTypeCard.vue";
import useCreateProduct from "../composables/product/useCreateProduct";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

const myFiles: any[] = [];

const { nameError, product } = useCreateProduct();

const ProductType = ref([
  {
    label: "Estandar",
    to: "product-add-standar",
    icon: standar,
  },
  // {
  //     label: 'Serie',
  //     to: 'product-add-serie',
  //     icon: ''
  // },
  {
    label: "Combo",
    to: "product-add-combo",
    icon: combo,
  },
  // {
  //     label: 'Tallas y Colores',
  //     to: 'product-add-size-color',
  //     icon: ''
  // },
  {
    label: "Subproducto",
    to: "product-add-subproduct",
    icon: subproduct,
  },
  // {
  //     label: 'Receta',
  //     to: 'product-add-recipe',
  //     icon: ''
  // },
  // {
  //     label: 'Lote',
  //     to: 'product-add-lote',
  //     icon: ''
  // },
  // {
  //     label: 'Servicio',
  //     to: 'product-add-service',
  //     icon: ''
  // }
]);
</script>

<template>
  <UIParentCardV2>
    <template #title>
      <div class="tw-relative tw-h-[100px]">
        <div
          class="tw-relative bg-secondary tw-h-[60px] tw-flex tw-overflow-visible tw-justify-center"
        >
          <div
            class="tw-absolute tw-bg-white tw-top-4 tw-overflow-hidden tw-rounded-full tw-w-[82px] border-secondary tw-h-[82px] tw-flex tw-justify-center tw-items-center"
          >
            <img :src="productBanerImg" alt="" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="tw-px-5 tw-py-5">
        <head
          class="tw-w-full tw-flex tw-justify-center tw-items-center tw-flex-col"
        >
          <h2 class="title-1">
            <span class="title-1 tw-font-semibold">Creando Producto:</span>
            {{ product.name }}
          </h2>
          <p class="tw-text-sm tw-text-gray-400">Codigo: {{ product.sku }}</p>
        </head>
        <FormSeccion title="Descripcion" class="tw-mt-2">
          <VRow>
            <VCol cols="12" class="py-1">
              <InputSection label-message="nombre del producto" required>
                <VTextField
                  variant="solo-filled"
                  hide-details
                  v-model="product.name"
                  placeholder="Ingrese el nombre del producto"
                  :error-messages="nameError"
                />
              </InputSection>
            </VCol>
            <VCol cols="12" class="py-1">
              <InputSection label-message="IMAGEN del producto">
                <FileUpload
                  :aspect-fatio="1"
                  :image-preview-height="100"
                  :label-template="smallFormFileUploadTempla"
                  :is-corp-circular="false"
                  :img-name="''"
                  :files="myFiles"
                />
              </InputSection>
            </VCol>
          </VRow>
        </FormSeccion>
        <section class="tw-flex tw-flex-col tw-gap-2 tw-mt-3 tw-px-2">
          <h2 class="title-1 tw-font-semibold">Tipo de producto</h2>
          <div class="tw-flex tw-flex-wrap tw-gap-x-4 tw-gap-y-2">
            <ProductTypeCard
              v-for="item in ProductType"
              :img="item.icon"
              :to="item.to"
              :label="item.label"
            />
          </div>
        </section>
      </div>
    </template>
  </UIParentCardV2>
</template>

<style scoped>
.border-r-20 {
  border-radius: 20px 20px 10px 10px !important;
}
.overflow-visible {
  overflow: visible !important;
}
</style>
