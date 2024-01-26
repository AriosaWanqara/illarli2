<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useBrandRules from "../../composables/brand/useBrandRules";
import type { Brand } from "../../models/Brand";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

interface props {
  brand: Brand;
  isLoading: boolean;
  buttonText: string;
}

const props = defineProps<props>();

const emit = defineEmits(["submit-brand"]);
const { brandRules } = useBrandRules();

const onBrandSubmit = () => {
  const brandValidator = useVuelidate(brandRules, props.brand);
  brandValidator.value.$reset();
  brandValidator.value.$validate();
  if (!brandValidator.value.$error) {
    emit("submit-brand", props.brand);
  } else {
    alert(JSON.stringify(brandValidator.value.$errors.map((x) => x.$property)));
  }
};
</script>

<template>
  <VRow class="mt-1">
    <VCol cols="12" class="py-0">
      <InputSection label-message="Nombre de la marca" required>
        <VTextField
          placeholder="nombre"
          v-model="props.brand.name"
          variant="solo-filled"
          flat
        />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Descripcion de la marca">
        <VTextarea
          rows="4"
          variant="solo-filled"
          flat
          placeholder="Observacion"
          v-model="props.brand.observation"
        />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-w-full tw-flex tw-justify-end">
        <VBtn
          color="info"
          @click="onBrandSubmit"
          :loading="isLoading"
          density="default"
          class="tw-transition-all tw-duration-200"
          :prepend-icon="
            props.brand.id ? 'mdi-content-save-outline' : 'mdi-plus'
          "
          variant="elevated"
          >{{ props.buttonText }}</VBtn
        >
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
