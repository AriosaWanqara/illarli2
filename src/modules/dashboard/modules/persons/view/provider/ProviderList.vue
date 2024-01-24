<script setup lang="ts">
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import PersonsTableList from "../../components/PersonsTableList.vue";
import useProviders from "../../composables/provider/useProviders";
import useProvidersMutations from "../../composables/provider/useProvidersMutations";
import type { Provider } from "../../models/Provider";

const { deleteProviderMutation } = useProvidersMutations();
const { providers, isProvidersLoading, providersHasError } = useProviders();
const showConfirmDialog = ref(false);
const selectedProvider = ref<Provider>({} as Provider);
const router = useRouter();

const onDelete = (person: Provider) => {
  selectedProvider.value = person;
  showConfirmDialog.value = true;
};
const onConfirmReponse = (response: boolean) => {
  if (response) {
    try {
      deleteProviderMutation.mutate(selectedProvider.value.id);
    } catch (error) {}
  }
  showConfirmDialog.value = false;
};

const onClientSelected = (person: Provider) => {
  // router.push({ name: "provider-update", params: { id: person.id } });
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
  <ViewScaffold>
    <template #default>
      <div>
        <div class="tw-flex tw-mb-2 tw-justify-between tw-items-center">
          <p class="tw-font-semibold tw-text-gray-400">Todos los clientes</p>
          <RouterLink :to="{ name: 'person-add' }">
            <v-btn flat color="success" prepend-icon="mdi-plus">Nuevo</v-btn>
          </RouterLink>
        </div>
        <PersonsTableList
          :is-delete-loading="deleteProviderMutation.isPending.value"
          :is-table-loading="isProvidersLoading"
          :is-update-loading="false"
          :persons="providers"
          @person-delete="onDelete"
          @person-update="onClientSelected"
          :has-error="providersHasError"
        />
        <ConfirmDeleteDialog
          :show-modal="showConfirmDialog"
          :title="'Desea borrar'"
          :dialog-text="'Esta seguro que desea borrar al proveedor?'"
          @confirm-response="onConfirmReponse"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
