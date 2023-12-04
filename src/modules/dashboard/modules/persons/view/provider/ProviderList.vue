<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useProvidersMutations from "../../composables/provider/useProvidersMutations";
import { watch } from "vue";
import useProviders from "../../composables/provider/useProviders";
import type { AxiosError } from "axios";

const { deleteProviderMutation } = useProvidersMutations();
const { providers, isProvidersLoading, providersHasError } = useProviders();

const onDelete = (id: string) => {
  deleteProviderMutation.mutate(id);
};

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
      <div v-else v-for="provider in providers">
        {{ provider.id }}
        {{ provider.name }}
        <RouterLink
          :to="{ name: 'provider-update', params: { id: provider.id } }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(provider.id)"
          :loading="deleteProviderMutation.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
