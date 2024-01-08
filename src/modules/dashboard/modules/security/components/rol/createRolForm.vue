<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { ref } from "vue";
import usePermissions from "../../composables/permission/usePermissions";
import useRolRules from "../../composables/rol/useRolRules";
import type { RolToSave } from "../../models/Rol";

interface props {
  isLoading: boolean;
  rol: RolToSave;
  formButtonText: string;
}

const { isPermissionsLoading, permissionsHasError, permissionDropdown } =
  usePermissions();
const { rol, formButtonText } = defineProps<props>();
const rolToSave = ref({ ...rol });
const emit = defineEmits(["rol-submit"]);
const { rolRules } = useRolRules();
const rolValidator = useVuelidate(rolRules, rolToSave);

const onRolSubmit = () => {
  rolValidator.value.$validate();
  if (!rolValidator.value.$error) {
    emit("rol-submit", rolToSave.value);
  } else {
    alert(JSON.stringify(rolValidator.value.$errors.map((x) => x.$property)));
  }
};
</script>

<template>
  <VRow class="mt-1">
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Nombre del rol</label
        >
        <VTextField placeholder="name" v-model="rolToSave.name" />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Permisos para el rol</label
        >
        <VSelect
          :items="permissionDropdown"
          item-title="label"
          placeholder="permisos"
          multiple
          item-value="value"
          :loading="isPermissionsLoading"
          v-model="rolToSave.permissions"
        >
        </VSelect>
      </div>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-end">
        <VBtn
          @click="onRolSubmit"
          :loading="isLoading"
          variant="elevated"
          color="info"
          :prepend-icon="rolToSave.id ? 'mdi-content-save-outline' : 'mdi-plus'"
          >{{ formButtonText }}</VBtn
        >
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
