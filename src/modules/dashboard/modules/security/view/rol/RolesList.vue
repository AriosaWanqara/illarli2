<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useRoles from "../../composables/rol/useRoles";
import useRolMutations from "../../composables/rol/useRolMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

const { isRolesLoading, roles, rolesHasError } = useRoles();
const { deleteRolMutations } = useRolMutations();

const onDelete = (id: string) => {
  deleteRolMutations.mutate(id);
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];

watch(deleteRolMutations.isError, () => {
  if (deleteRolMutations.isError.value) {
    let x = deleteRolMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(deleteRolMutations.isSuccess, () => {
  if (deleteRolMutations.isSuccess.value) {
    roles.value = roles.value.filter(
      (x) => x.id != deleteRolMutations.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold title="Roles">
    <template #action>
      <RouterLink :to="{ name: 'roles-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isRolesLoading">cargando..</p>
      <p v-else-if="rolesHasError">error</p>
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="roles"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{ name: 'roles-update', params: { id: item.id } }"
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
                  :loading="deleteRolMutations.isPending.value"
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
