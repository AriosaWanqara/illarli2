<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import useUserMutations from "../../composables/user/useUserMutations";
import type { userToSave } from "../../models/User";

import { useRouter } from "vue-router";
import createUserFormVue from "../../components/user/createUserForm.vue";
import { ref } from "vue";

const { saveUserMutations } = useUserMutations();
const router = useRouter();
const user = ref<userToSave>({} as userToSave);

const onUserSubmit = (userToSave: userToSave) => {
  saveUserMutations.mutate(userToSave);
};

watch(saveUserMutations.isError, () => {
  if (saveUserMutations.isError.value) {
    let x = saveUserMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveUserMutations.isSuccess, () => {
  if (saveUserMutations.isSuccess.value) {
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
      <createUserFormVue
        :form-button-text="'Añadir usuario'"
        :is-loding="saveUserMutations.isPending.value"
        :user="user"
        @user-submit="onUserSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
