<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import RolesTableList from "../../components/rol/RolesTableList.vue";
import useRolMutations from "../../composables/rol/useRolMutations";
import useRoles from "../../composables/rol/useRoles";
import type { Rol } from "../../models/Rol";
import { useRouter } from "vue-router";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";

const { roles } = useRoles();
const { deleteRolMutations } = useRolMutations();
const router = useRouter();
const showConfirmDialog = ref(false);
const selectedRol = ref<Rol>({} as Rol);

const onDelete = (rol: Rol) => {
  selectedRol.value = rol;
  showConfirmDialog.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    try {
      deleteRolMutations.mutate(selectedRol.value.id);
    } catch (error) {}
  }
  showConfirmDialog.value = false;
};

const onRolUpdate = (rol: Rol) => {
  router.push({ name: "roles-update", params: { id: rol.id } });
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
  <ViewScaffold>
    <template #default>
      <div>
        <div class="tw-flex tw-justify-between tw-mb-2 tw-items-center">
          <div class="">
            <p class="tw-font-semibold tw-text-gray-400">Todos los roles</p>
          </div>
          <RouterLink :to="{ name: 'roles-add' }">
            <v-btn flat color="success" prepend-icon="mdi-plus">Nuevo</v-btn>
          </RouterLink>
        </div>
        <RolesTableList
          :is-delete-loading="deleteRolMutations.isPending.value"
          :is-update-loading="false"
          @rol-delete="onDelete"
          @rol-update="onRolUpdate"
        />
        <ConfirmDeleteDialog
          :show-modal="showConfirmDialog"
          :title="'Desea borrar'"
          :dialog-text="'Esta seguro que desea borrar el rol?'"
          @confirm-response="onConfirmReponse"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
