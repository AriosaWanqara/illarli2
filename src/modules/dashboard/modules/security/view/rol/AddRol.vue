<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import usePermissions from "../../composables/permission/usePermissions";
import { ref } from "vue";
import useRolRules from "../../composables/rol/useRolRules";
import { useVuelidate } from "@vuelidate/core";
import useRolMutations from "../../composables/rol/useRolMutations";
import type { RolToSave } from "../../models/Rol";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";

const { isPermissionsLoading, permissionsHasError, permissionDropdown } =
  usePermissions();
const { rolRules } = useRolRules();
const { saveRolMutations } = useRolMutations();
const router = useRouter();

const rol = ref<RolToSave>({
  permissions: [] as string[],
} as RolToSave);
const rolValidator = useVuelidate(rolRules, rol);

const onRolSubmit = () => {
  rolValidator.value.$validate();
  if (!rolValidator.value.$error) {
    saveRolMutations.mutate(rol.value);
  } else {
    alert(JSON.stringify(rolValidator.value.$errors.map((x) => x.$property)));
  }
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
      <VRow class="mt-1">
        <VCol cols="6">
          <VTextField label="name" v-model="rol.name" />
        </VCol>
        <VCol cols="6">
          <VSelect
            :items="permissionDropdown"
            item-title="label"
            label="permisos"
            multiple
            item-value="value"
            :loading="isPermissionsLoading"
            v-model="rol.permissions"
          />
        </VCol>
        <VCol cols="12">
          <VBtn @click="onRolSubmit" :loading="saveRolMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
