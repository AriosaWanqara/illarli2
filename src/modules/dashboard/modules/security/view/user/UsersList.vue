<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import UsersTableList from "../../components/user/UsersTableList.vue";
import useUserMutations from "../../composables/user/useUserMutations";
import useUsers from "../../composables/user/useUsers";
import type { User } from "../../models/User";
import { useRouter } from "vue-router";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";
import { ref } from "vue";

const { users } = useUsers();
const { deleteUserMutations } = useUserMutations();
const router = useRouter();
const selectedUser = ref<User>({} as User);
const showConfirmDialog = ref(false);

const onDelete = (user: User) => {
  selectedUser.value = user;
  showConfirmDialog.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    try {
      deleteUserMutations.mutate(selectedUser.value.id);
    } catch (error) {}
  }
  showConfirmDialog.value = false;
};

const onUserSelected = (user: User) => {
  router.push({ name: "users-update", params: { id: user.id } });
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
  <ViewScaffold>
    <template #default>
      <div class="tw-flex tw-mb-1 tw-justify-between tw-items-center">
        <p class="tw-font-semibold tw-text-gray-400">Todos los Usuarios</p>
        <RouterLink :to="{ name: 'users-add' }">
          <v-btn flat color="success" prepend-icon="mdi-plus">Nuevo</v-btn>
        </RouterLink>
      </div>
      <div>
        <UsersTableList
          :is-delete-loading="deleteUserMutations.isPending.value"
          :is-update-loading="false"
          @user-delete="onDelete"
          @user-update="onUserSelected"
        />
      </div>
      <ConfirmDeleteDialog
        :show-modal="showConfirmDialog"
        :title="'Desea borrar'"
        :dialog-text="'Esta seguro que desea borrar el usuario?'"
        @confirm-response="onConfirmReponse"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
