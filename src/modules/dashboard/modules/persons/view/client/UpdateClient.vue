<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useClient from "../../composables/client/useClient";
import useClientRules from "../../composables/client/useClientRules";
import useClientsMutations from "../../composables/client/useClientsMutations";

const { updateClientMutations } = useClientsMutations();
const params = useRoute().params;
const router = useRouter();
const { client, clientHasError, isClientLoading } = useClient(
  params.id.toString()
);
const { clientRules } = useClientRules();
const clientToSave = ref(client);
const clientValidator = useVuelidate(clientRules, clientToSave);

const onClientSubmit = () => {
  clientValidator.value.$validate();
  if (!clientValidator.value.$error) {
    updateClientMutations.mutate(clientToSave.value);
  } else {
    alert(
      JSON.stringify(clientValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(updateClientMutations.isError, () => {
  if (updateClientMutations.isError.value) {
  }
});

watch(updateClientMutations.isSuccess, () => {
  if (updateClientMutations.isSuccess.value) {
    router.push({ name: "client-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Actualizar cliente">
    <template #actionBack>
      <RouterLink :to="{ name: 'client-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>

    <template #default>
      <VRow class="mt-1" v-if="isClientLoading">
        <VCol cols="12" class="py-1">
          <p>cargando...</p>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="clientHasError">
        <VCol cols="12" class="py-1">
          <p>error..</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="12" class="py-1">
          <VTextField label="Nombre" v-model="clientToSave.name" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary" @click="onClientSubmit">Crear</VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
