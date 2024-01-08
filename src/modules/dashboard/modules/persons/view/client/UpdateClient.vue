<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useClient from "../../composables/client/useClient";
import useClientsMutations from "../../composables/client/useClientsMutations";
import type { Provider } from "../../models/Provider";
import CreatePersonForm from "../../components/createPersonForm.vue";

const { updateClientMutations } = useClientsMutations();
const params = useRoute().params;
const router = useRouter();
const { client, clientHasError, isClientLoading } = useClient(
  params.id.toString()
);

const onClientSubmit = (personToSave: Provider) => {
  updateClientMutations.mutate(personToSave);
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
      </VRow>
      <VRow class="mt-1" v-else-if="clientHasError">
        <VCol cols="12" class="py-1">
          <p>error..</p>
        </VCol>
      </VRow>
      <CreatePersonForm
        v-else
        :is-loading="updateClientMutations.isPending.value"
        :person="client"
        :form-button-text="'Actualizar cliente'"
        @person-submit="onClientSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
