<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { watch } from "vue";
import PersonsTableList from "../../components/PersonsTableList.vue";
import useClients from "../../composables/client/useClients";
import useClientsMutations from "../../composables/client/useClientsMutations";
import type { Provider } from "../../models/Provider";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";

const { clients, isClientsLoading } = useClients();
const { deleteClientMutations } = useClientsMutations();
const router = useRouter();
const selectedClient = ref<Provider>({} as Provider);
const showConfirmDialog = ref(false);

const onDelete = (person: Provider) => {
  selectedClient.value = person;
  showConfirmDialog.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    try {
      deleteClientMutations.mutate(selectedClient.value.id);
    } catch (error) {}
  }
  showConfirmDialog.value = false;
};

const onClientSelected = (person: Provider) => {
  router.push({ name: "client-update", params: { id: person.id } });
};

watch(deleteClientMutations.isError, () => {
  if (deleteClientMutations.isError.value) {
    alert("Bad");
  }
});

watch(deleteClientMutations.isSuccess, () => {
  if (deleteClientMutations.isSuccess.value) {
    clients.value = clients.value.filter(
      (x) => x.id != deleteClientMutations.variables.value
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
          <RouterLink :to="{ name: 'client-add' }">
            <v-btn flat color="success" prepend-icon="mdi-plus">Nuevo</v-btn>
          </RouterLink>
        </div>
        <PersonsTableList
          :is-delete-loading="deleteClientMutations.isPending.value"
          :is-table-loading="isClientsLoading"
          :is-update-loading="false"
          :persons="clients"
          @person-delete="onDelete"
          @person-update="onClientSelected"
        />
        <ConfirmDeleteDialog
          :show-modal="showConfirmDialog"
          :title="'Desea borrar'"
          :dialog-text="'Esta seguro que desea borrar al cliente?'"
          @confirm-response="onConfirmReponse"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
