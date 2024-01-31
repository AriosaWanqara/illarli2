<script setup lang="ts">
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import type { baseProduct } from "../../../models/products/Product";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";

interface props {
  product: baseProduct;
}

const props = defineProps<props>();
</script>

<template>
  <FormSeccion title="Dimensiones del producto" border>
    <VRow>
      <VCol cols="12" md="6" class="py-1">
        <InputSection label-message="Ancho">
          <VTextField
            placeholder="Ingrese el ancho "
            v-model="props.product.width"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" md="6" class="py-1">
        <InputSection label-message="Alto">
          <VTextField
            placeholder="Ingrese el Alto "
            v-model="props.product.height"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" md="6" class="py-1">
        <InputSection label-message="Profundidad">
          <VTextField
            placeholder="Ingrese el Profundidad "
            v-model="props.product.depth"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" md="6" class="py-1">
        <InputSection label-message="Peso">
          <VTextField
            placeholder="Ingrese el Peso "
            v-model="props.product.weight"
          />
        </InputSection>
      </VCol>
    </VRow>
  </FormSeccion>
</template>

<style scoped></style>
