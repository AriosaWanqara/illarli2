<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import { ref } from "vue";
const state = ref(1);
</script>

<template>
  <div>
    <FormSeccion title="Datos específicos" border>
      <InputSection label-message="DETALLE DEL SERVICIO">
        <VTextarea placeholder="Ingrese detalle del servicio" />
      </InputSection>
    </FormSeccion>
    <FormSeccion title="Valor - Impuestos" border>
      <VRow>
        <VCol cols="6">
          <InputSection label-message="impuesto" required>
            <VSelect placeholder="seleccione los impuestos" />
          </InputSection>
        </VCol>
        <VCol cols="6">
          <InputSection label-message="precio FINAL con impUESTOS" required>
            <VTextField placeholder="Ingrese el precio" />
          </InputSection>
        </VCol>
      </VRow>
    </FormSeccion>
    <FormSeccion title="Mostrar en Ventas" border>
      <VRow>
        <VCol cols="12">
          <InputSection
            label-message="¿Este producto se encuentra habilitado para ventas?"
          >
            <v-btn-toggle
              color="primary"
              mandatory
              density="compact"
              v-model="state"
            >
              <v-btn value="0" variant="tonal">Desactivado</v-btn>
              <v-btn value="1" variant="tonal">Activado</v-btn>
            </v-btn-toggle>
          </InputSection>
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
