<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import type { Brand } from "../../models/Brand";
import useBrandRules from "../../composables/brand/useBrandRules";
import { ref } from "vue";

interface props {
  brand: Brand;
  isLoading: boolean;
}

const { brand } = defineProps<props>();
const brandToSave = ref({ ...brand });
const emit = defineEmits(["submit-brand"]);
const { brandRules } = useBrandRules();
const brandValidator = useVuelidate(brandRules, brandToSave);

const onBrandSubmit = () => {
  brandValidator.value.$validate();
  if (!brandValidator.value.$error) {
    emit("submit-brand", brandToSave.value);
  } else {
    alert(JSON.stringify(brandValidator.value.$errors.map((x) => x.$property)));
  }
};
</script>

<template>
  <VRow class="mt-1">
    <VCol cols="12" class="tw-mb-1">
      <VDivider />
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Nombre de la marca</label>
        <VTextField placeholder="nombre" v-model="brandToSave.name" />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Descripcion de la marca</label>
        <VTextarea
          rows="2"
          placeholder="Observacion"
          v-model="brandToSave.observation"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <VBtn color="primary" @click="onBrandSubmit" :loading="isLoading"
        >Crear</VBtn
      >
    </VCol>
  </VRow>
</template>

<style scoped></style>
