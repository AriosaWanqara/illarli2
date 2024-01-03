<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CreatePersonForm from "../../components/createPersonForm.vue";
import useClientsMutations from "../../composables/client/useClientsMutations";
import type { Provider } from "../../models/Provider";
import { personRolEnum } from "../../constant/personRolEnum";

const { saveClientMutations } = useClientsMutations();
const router = useRouter();

const client = ref<Provider>({
  phones: [] as string[],
  emails: [] as string[],
  roles: [personRolEnum.SUPPLIER],
} as Provider);

const onClientSubmit = (personToSave: Provider) => {
  saveClientMutations.mutate(personToSave);
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
      <CreatePersonForm
        :is-loading="saveClientMutations.isPending.value"
        :person="client"
        @person-submit="onClientSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
