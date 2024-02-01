<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import type { PurchaseToSave2 } from "../../../models/PurchaseOrder";

interface props {
  purchase: PurchaseToSave2;
}

const props = defineProps<props>();
</script>

<template>
  <FormSeccion :title="'Descripción'" border>
    <VRow>
      <VCol cols="12" class="px-0 py-1">
        <InputSection label-message="# de Factura" required class="tw-px-1">
          <VTextField
            placeholder="Ingrese el numero de factura"
            v-model="props.purchase.invoice"
          />
        </InputSection>
      </VCol>
      <VCol cols="6" class="px-0 py-1">
        <InputSection label-message="Proveedor" required class="tw-px-1">
          <VSelect
            placeholder="Seleccione un proveedor"
            v-model="props.purchase.subsidiary_id"
          />
        </InputSection>
      </VCol>
      <VCol cols="6" class="px-0 py-1">
        <InputSection label-message="Bodega" required class="tw-px-1">
          <VSelect
            placeholder="Seleccione una bodega"
            v-model="props.purchase.warehouse_id"
          />
        </InputSection>
      </VCol>
      <VCol cols="6" class="px-0 py-1">
        <InputSection label-message="Fecha de emision" required class="tw-px-1">
          <VTextField
            placeholder="Fecha inicio"
            type="date"
            v-model="props.purchase.date"
          ></VTextField>
        </InputSection>
      </VCol>
      <VCol cols="6" class="px-0 py-1">
        <InputSection label-message="Clave de acceso" required class="tw-px-1">
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
