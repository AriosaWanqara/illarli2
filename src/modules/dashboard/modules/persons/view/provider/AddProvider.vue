<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CreatePersonForm from "../../components/createPersonForm.vue";
import useProvidersMutations from "../../composables/provider/useProvidersMutations";
import { personRolEnum } from "../../constant/personRolEnum";
import type { Provider } from "../../models/Provider";

const { saveProviderMutation } = useProvidersMutations();

const router = useRouter();
const provider = ref<Provider>({
  phones: [] as string[],
  emails: [] as string[],
  roles: [personRolEnum.CUSTOMER],
} as Provider);

const onProviderSubmit = (personToSave: Provider) => {
  saveProviderMutation.mutate(personToSave);
};

watch(saveProviderMutation.isError, () => {
  if (saveProviderMutation.isError.value) {
    let error = saveProviderMutation.error.value as AxiosError;
    alert(JSON.stringify(error.response?.data));
  }
});
watch(saveProviderMutation.isSuccess, () => {
  if (saveProviderMutation.isSuccess.value) {
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
      <CreatePersonForm
        :is-loading="saveProviderMutation.isPending.value"
        :person="provider"
        @person-submit="onProviderSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
