<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import createRateForm from "../../components/rate/createRateForm.vue";
import useRateMutations from "../../compossables/rate/useRateMutations";
import type { Rate } from "../../models/Rate";

const { saveRateMutations } = useRateMutations();
const router = useRouter();

const rate = ref<Rate>({
  operation: "0",
  type: "0",
} as Rate);
const onRateSubmit = (rateToSave: Rate) => {
  saveRateMutations.mutate(rateToSave);
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
      <createRateForm
        :is-loading="saveRateMutations.isPending.value"
        :rate="rate"
        @rate-submit="onRateSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
