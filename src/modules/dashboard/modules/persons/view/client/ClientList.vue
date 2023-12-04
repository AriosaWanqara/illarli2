<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useClients from "../../composables/client/useClients";
import useClientsMutations from "../../composables/client/useClientsMutations";
import { watch } from "vue";

const { clients, clientsHasError, isClientsLoading } = useClients();
const { deleteClientMutations } = useClientsMutations();

const onDelete = (id: string) => {
  deleteClientMutations.mutate(id);
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
  <ViewScaffold title="Clientes">
    <template #action>
      <RouterLink :to="{ name: 'client-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <div class="" v-for="client in clients">
        {{ client.id }}
        {{ client.name }}
        <RouterLink
          :to="{ name: 'product-brands-update', params: { id: client.id } }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn @click="onDelete(client.id)">Eliminar</VBtn>
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
