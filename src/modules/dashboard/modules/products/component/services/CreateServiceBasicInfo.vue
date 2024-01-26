<script setup lang="ts">
import FileUpload from "@/modules/dashboard/components/shared/FileUpload.vue";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import { smallFormFileUploadTempla } from "@/modules/dashboard/const/FileUploadTemplate";
import timerIcon from "@dashboard/assets/images/ic_service_timer.png";
import { ref } from "vue";

const time = ref(0);

function timeConversion(duration: number) {
  const portions: string[] = [];
  let durationInMs = duration * 60 * 1000;
  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(durationInMs / msInHour);
  if (hours > 0) {
    portions.push(hours + "Horas");
    durationInMs = durationInMs - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(durationInMs / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + "Min");
    durationInMs = durationInMs - minutes * msInMinute;
  }

  return portions.join(" ");
}
</script>

<template>
  <FormSeccion title="Descripcion" border>
    <VRow>
      <VCol cols="12" class="py-1">
        <InputSection label-message="Nombre del servicio" required>
          <VTextField placeholder="Ingrese el nombre" hideDetails />
        </InputSection>
      </VCol>
      <VCol cols="12" class="py-1">
        <InputSection label-message="codigo" required>
          <VTextField placeholder="Ingrese el codigo" hideDetails />
        </InputSection>
      </VCol>
      <VCol cols="12" class="py-1">
        <InputSection label-message="imagen del servicio">
          <FileUpload
            :files="[]"
            :imagePreviewHeight="50"
            :imgName="null"
            :labelTemplate="smallFormFileUploadTempla"
            :aspectFatio="1"
            :isCorpCircular="false"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" class="py-1">
        <InputSection label-message="seccion/categoria">
          <VSelect placeholder="Seleccione una categoria" hideDetails />
        </InputSection>
      </VCol>
      <VCol cols="12">
        <div class="tw-flex tw-flex-col container-style">
          <div class="tw-flex tw-justify-between tw-px-6 tw-items-center">
            <div class="tw-flex tw-gap-2 tw-items-center">
              <div class="tw-h-[48px] tw-w-[48px]">
                <img :src="timerIcon" alt="" />
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
                  {{ time ? timeConversion(time) : "0 Min" }}.
                </h2>
              </div>
            </div>
          </div>
          <div class="tw-px-2">
            <v-slider
              hideDetails
              max="1440"
              v-model="time"
              step="5"
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
