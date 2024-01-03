<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CreateRolForm from "../../components/rol/createRolForm.vue";
import useRolMutations from "../../composables/rol/useRolMutations";
import type { RolToSave } from "../../models/Rol";

const { saveRolMutations } = useRolMutations();
const router = useRouter();

const rol = ref<RolToSave>({
  permissions: [] as string[],
} as RolToSave);
const onRolSubmit = (rolToSave: RolToSave) => {
  saveRolMutations.mutate(rolToSave);
};

watch(saveRolMutations.isError, () => {
  if (saveRolMutations.isError.value) {
    let x = saveRolMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveRolMutations.isSuccess, () => {
  if (saveRolMutations.isSuccess.value) {
    router.push({ name: "roles-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear rols">
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
      <CreateRolForm
        :is-loading="saveRolMutations.isPending.value"
        :rol="rol"
        @rol-submit="onRolSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
