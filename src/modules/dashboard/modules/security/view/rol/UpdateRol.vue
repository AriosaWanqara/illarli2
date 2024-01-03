<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateRolForm from "../../components/rol/createRolForm.vue";
import useRol from "../../composables/rol/useRol";
import useRolMutations from "../../composables/rol/useRolMutations";
import type { RolToSave } from "../../models/Rol";

const params = useRoute().params;
const { isRolLoading, rolHasError, rolToSave } = useRol(params.id.toString());
const { updateRolMutations } = useRolMutations();
const router = useRouter();

const onRolSubmit = (rol: RolToSave) => {
  updateRolMutations.mutate(rol);
};

watch(updateRolMutations.isError, () => {
  if (updateRolMutations.isError.value) {
    let x = updateRolMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateRolMutations.isSuccess, () => {
  if (updateRolMutations.isSuccess.value) {
    router.push({ name: "roles-list" });
  }
});
</script>

<template>
  <ViewScaffold title="actualizar rols">
    <template #actionBack>
      <RouterLink :to="{ name: 'roles-list' }">
        <v-btn
          color="textPrimary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>

    <template #default>
      <VRow class="mt-1" v-if="isRolLoading">
        <VCol>
          <p>cargando..</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="rolHasError">
        <VCol>
          <p>error..</p>
        </VCol>
      </VRow>
      <CreateRolForm
        v-else
        :is-loading="updateRolMutations.isPending.value"
        :rol="rolToSave"
        @rol-submit="onRolSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
