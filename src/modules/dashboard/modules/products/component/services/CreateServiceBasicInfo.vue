<script setup lang="ts">
import FileUpload from "@/modules/dashboard/components/shared/FileUpload.vue";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import { smallFormFileUploadTempla } from "@/modules/dashboard/const/FileUploadTemplate";
</script>

<template>
  <FormSeccion title="Descripcion" border>
    <VRow>
      <VCol cols="12" class="py-1">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase">
            Nombre del servicio<sapn class="tw-text-red-300">*</sapn>
          </label>
          <VTextField placeholder="Ingrese el nombre" hideDetails />
        </div>
      </VCol>
      <VCol cols="12" class="py-1">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase">
            codigo<sapn class="tw-text-red-300">*</sapn>
          </label>
          <VTextField placeholder="Ingrese el codigo" hideDetails />
        </div>
      </VCol>
      <VCol cols="12" class="py-1">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase">
            imagen del servicio
          </label>
          <FileUpload
            :files="[]"
            :imagePreviewHeight="50"
            :imgName="null"
            :labelTemplate="smallFormFileUploadTempla"
            :aspectFatio="1"
            :isCorpCircular="false"
          />
        </div>
      </VCol>
      <VCol cols="12" class="py-1">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase">
            seccion/categoria
          </label>
          <VSelect placeholder="Seleccione una categoria" hideDetails />
        </div>
      </VCol>
      <VCol cols="12">
        <div class="tw-flex tw-flex-col container-style">
          <div class="tw-flex tw-justify-between tw-px-6 tw-items-center">
            <div class="tw-flex tw-gap-1 tw-items-center">
              <div class="tw-h-[48px] tw-w-[48px]">
                <p>icono</p>
              </div>
              <div class="tw-flex tw-flex-col tw-gap-1">
                <p
                  class="tw-font-semibold tw-uppercase tw-text-gray-400 tw-text-sm"
                >
                  tiempo estimado
                </p>

                <p class="tw-text-gray-400 tw-text-xs">
                  Seleccione en horas y minutos
                </p>
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-1">
              <div class="tw-flex tw-flex-col tw-gap-1">
                <p class="tw-uppercase tw-text-gray-400 tw-text-xs">
                  Seleccionado
                </p>
                <h2 class="tw-font-semibold tw-capitalize tw-text-base">
                  1 Hora 30 Min.
                </h2>
              </div>
            </div>
          </div>
          <div class="tw-px-2">
            <v-slider
              hideDetails
              color="primary"
              track-size="2"
              trackColor="borderColor"
              thumb-size="10"
            ></v-slider>
          </div>
        </div>
      </VCol>
    </VRow>
  </FormSeccion>
</template>

<style scoped lang="scss">
.container-style {
  border: 1px solid rgba(var(--v-theme-borderColor));
  padding-top: 6px;
  border-radius: 10px;
  background-color: rgba(var(--v-theme-containerBg));
}
</style>
