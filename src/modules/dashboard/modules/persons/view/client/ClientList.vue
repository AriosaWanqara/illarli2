<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useClients from "../../composables/client/useClients";
import useClientsMutations from "../../composables/client/useClientsMutations";
import { watch } from "vue";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

const { clients, clientsHasError, isClientsLoading } = useClients();
const { deleteClientMutations } = useClientsMutations();

const onDelete = (id: string) => {
  deleteClientMutations.mutate(id);
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Identificacion", value: "identity" },
  { text: "", value: "actions", width: 110 },
];

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
  <ViewScaffold title="Clientes">
    <template #action>
      <RouterLink :to="{ name: 'client-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isClientsLoading">cargando..</p>
      <p v-else-if="clientsHasError">error</p>
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="clients"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{ name: 'client-update', params: { id: item.id } }"
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
                  :loading="deleteClientMutations.isPending.value"
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
