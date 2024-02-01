<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import { DatePicker } from "v-calendar";
import type { PurchaseToSave2 } from "../../../models/PurchaseOrder";

interface props {
  purchase: PurchaseToSave2;
}

const props = defineProps<props>();
</script>

<template>
  <FormSeccion :title="'Descripción'" border>
    <VRow>
      <VCol cols="12">
        <InputSection label-message="# de Factura" required>
          <VTextField
            placeholder="Ingrese el numero de factura"
            v-model="props.purchase.invoice"
          />
        </InputSection>
      </VCol>
      <VCol cols="6">
        <InputSection label-message="Proveedor" required>
          <VSelect
            placeholder="Seleccione un proveedor"
            v-model="props.purchase.subsidiary_id"
          />
        </InputSection>
      </VCol>
      <VCol cols="6">
        <InputSection label-message="Bodega" required>
          <VSelect
            placeholder="Seleccione una bodega"
            v-model="props.purchase.warehouse_id"
          />
        </InputSection>
      </VCol>
      <VCol cols="6">
        <InputSection label-message="Fecha de emision" required>
          <DatePicker
            :popover="{ placement: 'right-start' }"
            v-model="props.purchase.date"
          >
            <template #default="{ inputValue, inputEvents }">
              <VTextField
                placeholder="Fecha inicio"
                append-inner-icon="mdi-calendar-blank"
                :model-value="inputValue"
                hide-details
                v-on="inputEvents"
              ></VTextField>
            </template>
          </DatePicker>
        </InputSection>
      </VCol>
      <VCol cols="6">
        <InputSection label-message="Clave de acceso" required>
          <VTextField
            placeholder="Ingrese la clave de acceso"
            v-model="props.purchase.access_key"
          />
        </InputSection>
      </VCol>
    </VRow>
  </FormSeccion>
</template>

<style scoped></style>
