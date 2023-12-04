<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { RouterLink } from "vue-router";
import useRates from "../../compossables/rate/useRates";
import useRateMutations from "../../compossables/rate/useRateMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const { isRatesLoading, rates, ratesHasErro } = useRates();
const { deleteRateMutations } = useRateMutations();

const onDelete = (id: string) => {
  deleteRateMutations.mutate(id);
};

watch(deleteRateMutations.isError, () => {
  if (deleteRateMutations.isError.value) {
    let x = deleteRateMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(deleteRateMutations.isSuccess, () => {
  if (deleteRateMutations.isSuccess.value) {
    rates.value = rates.value.filter(
      (x) => x.id != deleteRateMutations.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold title="Tarifas">
    <template #action>
      <RouterLink :to="{ name: 'rate-add' }">
        <VBtn>add</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isRatesLoading">cargando..</p>
      <p v-else-if="ratesHasErro">error</p>
      <div v-else v-for="rate in rates">
        {{ rate.name }}
        <RouterLink :to="{ name: 'rate-update', params: { id: rate.id } }">
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn @click="onDelete(rate.id)">Eliminar</VBtn>
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
