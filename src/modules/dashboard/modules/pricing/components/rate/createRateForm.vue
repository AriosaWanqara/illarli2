<script setup lang="ts">
import { ref } from "vue";
import type { Rate } from "../../models/Rate";
import useRateRules from "../../compossables/rate/useRateRules";
import useVuelidate from "@vuelidate/core";

interface props {
  rate: Rate;
  isLoading: boolean;
}

const { rate } = defineProps<props>();
const emit = defineEmits(["rate-submit"]);

const rateToSave = ref({ ...rate });
const { rateRules } = useRateRules();
const rateValidator = useVuelidate(rateRules, rateToSave);

const onRateSubmit = () => {
  rateValidator.value.$validate();
  if (!rateValidator.value.$error) {
    emit("rate-submit", rateToSave.value);
  }
};
</script>

<template>
  <VRow class="mt-1">
    <VCol cols="6">
      <v-btn-toggle
        v-model="rateToSave.operation"
        color="primary"
        mandatory
        density="comfortable"
      >
        <v-btn value="1" variant="tonal">suma</v-btn>
        <v-btn value="0" variant="tonal">resta</v-btn>
      </v-btn-toggle>
    </VCol>
    <VCol cols="6">
      <v-btn-toggle
        v-model="rateToSave.type"
        color="primary"
        mandatory
        density="comfortable"
      >
        <v-btn value="0" variant="tonal">%</v-btn>
        <v-btn value="1" variant="tonal">cash</v-btn>
      </v-btn-toggle>
    </VCol>
    <VCol cols="6">
      <VTextField label="value" v-model="rateToSave.value" />
    </VCol>
    <VCol cols="6">
      <VTextField label="name" v-model="rateToSave.name" />
    </VCol>
    <VCol cols="6">
      <VTextField label="description" v-model="rateToSave.description" />
    </VCol>
    <VCol cols="12">
      <VBtn @click="onRateSubmit" :loading="isLoading">crear</VBtn>
    </VCol>
  </VRow>
</template>

<style scoped></style>
