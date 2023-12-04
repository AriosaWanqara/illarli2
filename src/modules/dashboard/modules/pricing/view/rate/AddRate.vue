<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";
import type { Rate } from "../../models/Rate";
import useRateRules from "../../compossables/rate/useRateRules";
import useRateMutations from "../../compossables/rate/useRateMutations";
import { useVuelidate } from "@vuelidate/core";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";

const { rateRules } = useRateRules();
const { saveRateMutations } = useRateMutations();
const router = useRouter();

const rate = ref<Rate>({
  operation: "0",
  type: "0",
} as Rate);
const rateValidator = useVuelidate(rateRules, rate);

const onRateSubmit = () => {
  rateValidator.value.$validate();
  if (!rateValidator.value.$error) {
    saveRateMutations.mutate(rate.value);
  } else {
    alert(JSON.stringify(rateValidator.value.$errors.map((x) => x.$message)));
  }
};

watch(saveRateMutations.isError, () => {
  if (saveRateMutations.isError.value) {
    let x = saveRateMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveRateMutations.isSuccess, () => {
  if (saveRateMutations.isSuccess.value) {
    router.push({ name: "rate-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear Tarifas">
    <template #action>
      <RouterLink :to="{ name: 'rate-list' }">
        <VBtn>back</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-1">
        <VCol cols="6">
          <v-btn-toggle
            v-model="rate.operation"
            color="primary"
            mandatory
            density="comfortable"
          >
            <v-btn value="0" variant="tonal">suma</v-btn>
            <v-btn value="1" variant="tonal">resta</v-btn>
          </v-btn-toggle>
        </VCol>
        <VCol cols="6">
          <v-btn-toggle
            v-model="rate.type"
            color="primary"
            mandatory
            density="comfortable"
          >
            <v-btn value="0" variant="tonal">%</v-btn>
            <v-btn value="1" variant="tonal">cash</v-btn>
          </v-btn-toggle>
        </VCol>
        <VCol cols="6">
          <VTextField label="value" v-model="rate.value" />
        </VCol>
        <VCol cols="6">
          <VTextField label="name" v-model="rate.name" />
        </VCol>
        <VCol cols="6">
          <VTextField label="description" v-model="rate.description" />
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onRateSubmit"
            :loading="saveRateMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
