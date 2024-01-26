<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import { ref } from "vue";
const state = ref(1);
</script>

<template>
  <div>
    <FormSeccion title="Datos específicos" border>
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase"
          >DETALLE DEL SERVICIO
        </label>
        <VTextarea placeholder="Ingrese detalle del servicio" />
      </div>
    </FormSeccion>
    <FormSeccion title="Valor - Impuestos" border>
      <VRow>
        <VCol cols="6">
          <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase"
            >impuesto<span class="tw-text-red-300">*</span>
          </label>
          <VSelect placeholder="seleccione los impuestos" />
        </VCol>
        <VCol cols="6">
          <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase"
            >precio FINAL con impUESTOS<span class="tw-text-red-300">*</span>
          </label>
          <VTextField placeholder="Ingrese el precio" />
        </VCol>
      </VRow>
    </FormSeccion>
    <FormSeccion title="Mostrar en Ventas" border>
      <VRow>
        <VCol cols="12">
          <div class="tw-flex tw-flex-col tw-gap-1">
            <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase"
              >¿Este producto se encuentra habilitado para ventas?
            </label>
            <v-btn-toggle
              color="primary"
              mandatory
              density="compact"
              v-model="state"
            >
              <v-btn value="0" variant="tonal">Desactivado</v-btn>
              <v-btn value="1" variant="tonal">Activado</v-btn>
            </v-btn-toggle>
          </div>
        </VCol>
        <VCol cols="12">
          <div class="tw-flex tw-justify-end tw-gap-2">
            <VBtn color="borderColor" variant="outlined">
              <p class="tw-text-gray-400">Cancelar</p>
            </VBtn>
            <VBtn color="success" prepend-icon="mdi-plus">Añadir servicio</VBtn>
          </div>
        </VCol>
      </VRow>
    </FormSeccion>
  </div>
</template>

<style scoped></style>
