<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useUsers from "../../composables/user/useUsers";
import useUserMutations from "../../composables/user/useUserMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

const { isUserLoading, users, usersHasError } = useUsers();
const { deleteUserMutations } = useUserMutations();

const onDelete = (id: string) => {
  deleteUserMutations.mutate(id);
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];

watch(deleteUserMutations.isError, () => {
  if (deleteUserMutations.isError.value) {
    let x = deleteUserMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(deleteUserMutations.isSuccess, () => {
  if (deleteUserMutations.isSuccess.value) {
    users.value = users.value.filter(
      (x) => x.id != deleteUserMutations.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold title="Usuario">
    <template #action>
      <RouterLink :to="{ name: 'users-add' }">
        <v-btn flat color="success">Agregar</v-btn>
      </RouterLink>
    </template>

    <template #default>
      <p v-if="isUserLoading">cargando..</p>
      <p v-else-if="usersHasError">error</p>
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="users"
          :loading="isUserLoading"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{ name: 'users-update', params: { id: item.id } }"
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
                  :loading="deleteUserMutations.isPending.value"
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
