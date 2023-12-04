<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useRoute, useRouter } from "vue-router";
import useRate from "../../compossables/rate/useRate";
import { useVuelidate } from "@vuelidate/core";
import useRateRules from "../../compossables/rate/useRateRules";
import useRateMutations from "../../compossables/rate/useRateMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const params = useRoute().params;
const { isRateLoading, rate, rateHasError } = useRate(params.id.toString());
const { rateRules } = useRateRules();
const rateValidator = useVuelidate(rateRules, rate);
const { updateRateMutations } = useRateMutations();
const router = useRouter();

const onRateSubmit = () => {
  rateValidator.value.$validate();
  if (!rateValidator.value.$error) {
    updateRateMutations.mutate(rate.value);
  } else {
    alert(JSON.stringify(rateValidator.value.$errors.map((x) => x.$message)));
  }
};

watch(updateRateMutations.isError, () => {
  if (updateRateMutations.isError.value) {
    let x = updateRateMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateRateMutations.isSuccess, () => {
  if (updateRateMutations.isSuccess.value) {
    router.push({ name: "rate-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Actualizar Tarifas">
    <template #action>
      <RouterLink :to="{ name: 'rate-list' }">
        <VBtn>back</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <VRow v-if="isRateLoading">
        <p>cargando..</p>
      </VRow>
      <VRow v-else-if="rateHasError">
        <p>error..</p>
      </VRow>
      <VRow class="mt-1" v-else>
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
            :loading="updateRateMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
