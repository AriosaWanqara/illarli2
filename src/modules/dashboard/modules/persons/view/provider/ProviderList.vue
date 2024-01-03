<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useProvidersMutations from "../../composables/provider/useProvidersMutations";
import { watch } from "vue";
import useProviders from "../../composables/provider/useProviders";
import type { AxiosError } from "axios";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

const { deleteProviderMutation } = useProvidersMutations();
const { providers, isProvidersLoading, providersHasError } = useProviders();

const onDelete = (id: string) => {
  deleteProviderMutation.mutate(id);
};
const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Identificacion", value: "identity" },
  { text: "", value: "actions", width: 110 },
];

watch(deleteProviderMutation.isError, () => {
  if (deleteProviderMutation.isError.value) {
    let error = deleteProviderMutation.error.value as AxiosError;
    alert(JSON.stringify(error.response?.data));
  }
});

watch(deleteProviderMutation.isSuccess, () => {
  if (deleteProviderMutation.isSuccess.value) {
    providers.value = providers.value.filter(
      (x) => x.id != deleteProviderMutation.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold title="Proveedores">
    <template #action>
      <RouterLink :to="{ name: 'provider-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isProvidersLoading">cargando..</p>
      <p v-else-if="providersHasError">error</p>
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="providers"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{ name: 'provider-update', params: { id: item.id } }"
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
                  :loading="deleteProviderMutation.isPending.value"
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
