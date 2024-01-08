<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUser from "../../composables/user/useUser";
import useUserMutations from "../../composables/user/useUserMutations";
import type { userToSave } from "../../models/User";
import CreateUserForm from "../../components/user/createUserForm.vue";

const params = useRoute().params;
const router = useRouter();
const { isUserLoading, userHasError, userToSave, cashDrawerDropdown } = useUser(
  params.id.toString()
);
const { updateUserMutations } = useUserMutations();

const onUserSubmit = (userToSave: userToSave) => {
  updateUserMutations.mutate(userToSave);
};

watch(updateUserMutations.isError, () => {
  if (updateUserMutations.isError.value) {
    let x = updateUserMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateUserMutations.isSuccess, () => {
  if (updateUserMutations.isSuccess.value) {
    router.push({ name: "users-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear usuario">
    <template #actionBack>
      <RouterLink :to="{ name: 'users-list' }">
        <v-btn
          color="textPrimary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>

    <template #default>
      <VRow class="mt-1" v-if="isUserLoading">
        <p>cargando</p>
      </VRow>
      <VRow class="mt-1" v-else-if="userHasError">
        <p>error</p>
      </VRow>
      <CreateUserForm
        v-else
        :form-button-text="'Actualizar usuario'"
        :is-loding="updateUserMutations.isPending.value"
        :user="userToSave"
        @user-submit="onUserSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
