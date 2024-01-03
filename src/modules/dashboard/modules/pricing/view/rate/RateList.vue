<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { RouterLink } from "vue-router";
import useRates from "../../compossables/rate/useRates";
import useRateMutations from "../../compossables/rate/useRateMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

const { isRatesLoading, rates, ratesHasErro } = useRates();
const { deleteRateMutations } = useRateMutations();

const onDelete = (id: string) => {
  deleteRateMutations.mutate(id);
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];

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
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="rates"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{ name: 'rate-update', params: { id: item.id } }"
                >
                  <v-btn icon flat v-bind="props" variant="text">
                    <Icon icon="mdi:pencil" />
                  </v-btn>
                </RouterLink>
              </template>
            </v-tooltip>
            <v-tooltip text="Delete">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  flat
                  v-bind="props"
                  variant="text"
                  @click="onDelete(item.id)"
                  :loading="deleteRateMutations.isPending.value"
                >
                  <Icon icon="mdi:trash-can-outline" />
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </EasyDataTable>
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
