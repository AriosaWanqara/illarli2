<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useRoute, useRouter } from "vue-router";
import useRol from "../../composables/rol/useRol";
import { ref } from "vue";
import type { RolToSave } from "../../models/Rol";
import { useVuelidate } from "@vuelidate/core";
import useRolRules from "../../composables/rol/useRolRules";
import useRolMutations from "../../composables/rol/useRolMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import usePermissions from "../../composables/permission/usePermissions";

const params = useRoute().params;
const { isRolLoading, permissions, rol, rolHasError } = useRol(
  params.id.toString()
);
const { rolRules } = useRolRules();
const { updateRolMutations } = useRolMutations();
const router = useRouter();
const { isPermissionsLoading, permissionsHasError, permissionDropdown } =
  usePermissions();

const rolToSave = ref<RolToSave>({
  id: rol.value.id,
  name: rol.value.name,
  permissions: permissions.value,
} as RolToSave);
const rolValidator = useVuelidate(rolRules, rolToSave);

const onRolSubmit = () => {
  rolValidator.value.$validate();
  if (!rolValidator.value.$error) {
    updateRolMutations.mutate(rolToSave.value);
  } else {
    alert(JSON.stringify(rolValidator.value.$errors.map((x) => x.$property)));
  }
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
      <VRow class="mt-1" v-else>
        <VCol cols="6">
          <VTextField label="name" v-model="rolToSave.name" />
        </VCol>
        <VCol cols="6">
          <VSelect
            :items="permissionDropdown"
            item-title="label"
            label="permisos"
            multiple
            item-value="value"
            :loading="isPermissionsLoading"
            v-model="rolToSave.permissions"
          />
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onRolSubmit"
            :loading="updateRolMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
