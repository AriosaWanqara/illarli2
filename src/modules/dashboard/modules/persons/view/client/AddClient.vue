<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useClientsMutations from "../../composables/client/useClientsMutations";
import useClientRules from "../../composables/client/useClientRules";
import type { Client } from "@dashboard/modules/persons/models/Client";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { allGenders } from "../../constant/genderEnum";

const { saveClientMutations } = useClientsMutations();
const router = useRouter();
const { clientRules } = useClientRules();

const client = ref<Client>({} as Client);
const clientValidator = useVuelidate(clientRules, client);

const onClientSubmit = () => {
  clientValidator.value.$validate();
  if (!clientValidator.value.$error) {
    saveClientMutations.mutate(client.value);
  } else {
    alert(
      JSON.stringify(clientValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(saveClientMutations.isError, () => {
  if (saveClientMutations.isError.value) {
  }
});

watch(saveClientMutations.isSuccess, () => {
  if (saveClientMutations.isSuccess.value) {
    router.push({ name: "client-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear cliente">
    <template #actionBack>
      <RouterLink :to="{ name: 'client-list' }">
        <v-btn
          color="textPrimary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>

    <template #default>
      <VRow class="mt-1">
        <VCol cols="12" class="py-1">
          <VTextField label="Nombre" v-model="client.name" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VSelect
            label="Genero"
            :items="allGenders"
            itemTitle="label"
            itemValue="value"
          />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onClientSubmit"
            :loading="saveClientMutations.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
