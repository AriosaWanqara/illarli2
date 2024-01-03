<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateRateForm from "../../components/rate/createRateForm.vue";
import useRate from "../../compossables/rate/useRate";
import useRateMutations from "../../compossables/rate/useRateMutations";
import type { Rate } from "../../models/Rate";

const params = useRoute().params;
const { isRateLoading, rate, rateHasError } = useRate(params.id.toString());
const { updateRateMutations } = useRateMutations();
const router = useRouter();

const onRateSubmit = (rateToSave: Rate) => {
  updateRateMutations.mutate(rateToSave);
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
      <CreateRateForm
        v-else
        :is-loading="updateRateMutations.isPending.value"
        :rate="rate"
        @rate-submit="onRateSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
