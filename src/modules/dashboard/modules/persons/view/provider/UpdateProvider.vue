<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useProvider from "../../composables/provider/useProvider";
import useProvidersMutations from "../../composables/provider/useProvidersMutations";
import type { Provider } from "../../models/Provider";
import CreatePersonForm from "../../components/createPersonForm.vue";

const { updateProviderMutation } = useProvidersMutations();
const params = useRoute().params;
const router = useRouter();
const { isProviderLoading, provider, providerHasError } = useProvider(
  params.id.toString()
);

const onProviderSubmit = (providerToSave: Provider) => {
  updateProviderMutation.mutate(providerToSave);
};

watch(updateProviderMutation.isError, () => {
  if (updateProviderMutation.isError.value) {
    alert("bad");
  }
});
watch(updateProviderMutation.isSuccess, () => {
  if (updateProviderMutation.isSuccess.value) {
    router.push({ name: "provider-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear proveedor">
    <template #actionBack>
      <RouterLink :to="{ name: 'provider-list' }">
        <v-btn
          color="textPrimary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>

    <template #default>
      <VRow class="mt-1" v-if="isProviderLoading">
        <VCol cols="12" class="py-1">
          <p>cargando...</p>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="providerHasError">
        <VCol cols="12" class="py-1">
          <p>error</p>
        </VCol>
      </VRow>
      <CreatePersonForm
        v-else
        :is-loading="updateProviderMutation.isPending.value"
        :person="provider"
        @person-submit="onProviderSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
