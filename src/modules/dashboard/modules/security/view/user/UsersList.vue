<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useUsers from "../../composables/user/useUsers";
import useUserMutations from "../../composables/user/useUserMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const { isUserLoading, users, usersHasError } = useUsers();
const { deleteUserMutations } = useUserMutations();

const onDelete = (id: string) => {
  deleteUserMutations.mutate(id);
};

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
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>

    <template #default>
      <p v-if="isUserLoading">cargando..</p>
      <p v-else-if="usersHasError">error</p>
      <div v-else v-for="user in users">
        {{ user.name }}
        <RouterLink :to="{ name: 'users-update', params: { id: user.id } }">
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(user.id)"
          :loading="deleteUserMutations.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
