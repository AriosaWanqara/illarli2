<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { ref } from "vue";
import usePermissions from "../../composables/permission/usePermissions";
import useRolRules from "../../composables/rol/useRolRules";
import type { RolToSave } from "../../models/Rol";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

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
    <VCol cols="12">
      <InputSection label-message="Nombre del rol" required>
        <VTextField placeholder="name" v-model="rolToSave.name" />
      </InputSection>
    </VCol>
    <VCol cols="12">
      <InputSection label-message="Permisos para el rol" required>
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
      </InputSection>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-end">
        <VBtn
          @click="onRolSubmit"
          :loading="isLoading"
          variant="elevated"
          density="default"
          color="info"
          :prepend-icon="rolToSave.id ? 'mdi-content-save-outline' : 'mdi-plus'"
          >{{ formButtonText }}</VBtn
        >
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
