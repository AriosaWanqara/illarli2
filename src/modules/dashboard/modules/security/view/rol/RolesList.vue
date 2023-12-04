<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useRoles from "../../composables/rol/useRoles";
import useRolMutations from "../../composables/rol/useRolMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const { isRolesLoading, roles, rolesHasError } = useRoles();
const { deleteRolMutations } = useRolMutations();

const onDelete = (id: string) => {
  deleteRolMutations.mutate(id);
};

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
      <div v-else v-for="rol in roles">
        {{ rol.name }}
        <RouterLink :to="{ name: 'roles-update', params: { id: rol.id } }">
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(rol.id)"
          :loading="deleteRolMutations.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
