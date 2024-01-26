<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useRateRules from "../../compossables/rate/useRateRules";
import type { Rate } from "../../models/Rate";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

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
    <VCol cols="12" class="py-1">
      <InputSection label-message="Caracteristicas de la tarifa" required>
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
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-1">
      <InputSection label-message="Nombre de la tarifa" required>
        <VTextField
          variant="solo-filled"
          placeholder="name"
          hide-details
          v-model="props.rate.name"
        />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-1">
      <InputSection label-message="Valor de la tarifa" required>
        <VTextField
          variant="solo-filled"
          placeholder="value"
          type="number"
          hide-details
          v-model="props.rate.value"
        />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-1">
      <InputSection label-message="Descripcion de la tarifa">
        <VTextarea
          variant="solo-filled"
          placeholder="description"
          flat
          v-model="props.rate.description"
        />
      </InputSection>
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
