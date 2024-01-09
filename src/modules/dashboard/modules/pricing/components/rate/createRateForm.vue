<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useRateRules from "../../compossables/rate/useRateRules";
import type { Rate } from "../../models/Rate";

interface props {
  rate: Rate;
  isLoading: boolean;
  formButtonText: string;
}

const props = defineProps<props>();
const emit = defineEmits(["rate-submit"]);

const onRateSubmit = () => {
  const { rateRules } = useRateRules();
  const rateValidator = useVuelidate(rateRules, props.rate);
  rateValidator.value.$validate();
  if (!rateValidator.value.$error) {
    emit("rate-submit", props.rate);
  }
};
</script>

<template>
  <VRow class="mt-1">
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Caracteristicas de la tarifa
          <span class="tw-text-red-300">*</span></label
        >
        <div class="tw-flex tw-gap-2 tw-flex-col md:tw-flex-row">
          <v-btn-toggle
            v-model="props.rate.operation"
            color="primary"
            mandatory
            density="compact"
          >
            <v-btn value="1" variant="tonal">Aumentar</v-btn>
            <v-btn value="0" variant="tonal">Disminuir</v-btn>
          </v-btn-toggle>
          <v-btn-toggle
            v-model="props.rate.type"
            color="primary"
            mandatory
            density="compact"
          >
            <v-btn value="0" variant="tonal">porcentage</v-btn>
            <v-btn value="1" variant="tonal">En Valor</v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Nombre de la tarifa <span class="tw-text-red-300">*</span></label
        >
        <VTextField
          variant="solo-filled"
          placeholder="name"
          v-model="props.rate.name"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Valor de la tarifa <span class="tw-text-red-300">*</span></label
        >
        <VTextField
          variant="solo-filled"
          placeholder="value"
          type="number"
          v-model="props.rate.value"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Descripcion de la tarifa</label
        >
        <VTextarea
          variant="solo-filled"
          placeholder="description"
          flat
          v-model="props.rate.description"
        />
      </div>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-end">
        <VBtn
          @click="onRateSubmit"
          color="info"
          density="default"
          variant="elevated"
          :loading="isLoading"
          :prepend-icon="
            props.rate.id ? 'mdi-content-save-outline' : 'mdi-plus'
          "
          >{{ props.formButtonText }}</VBtn
        >
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
