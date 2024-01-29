<script setup lang="ts">
import { ref } from "vue";
import type { userToSave } from "../../models/User";
import useRoles from "../../composables/rol/useRoles";
import useSubsidiaries from "../../../config/composables/subsidiary/useSubsidiaries";
import type { Dropdown } from "@/models/Dropdown";
import { watch } from "vue";
import useUserRules from "../../composables/user/useUserRules";
import useVuelidate from "@vuelidate/core";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";

interface props {
  isLoding: boolean;
  user: userToSave;
  cashDrawerDropdownProps?: Dropdown[];
  formButtonText: string;
}

const { user, cashDrawerDropdownProps, formButtonText } = defineProps<props>();
const emit = defineEmits(["user-submit"]);
const { isRolesLoading, rolesHasError, rolesDropdown } = useRoles();
const { isSubsidiariesLoading, subsidiaryDropdown, subsidiaries } =
  useSubsidiaries();
const cashDrawerDropdown = ref<Dropdown[]>([]);
const userToSave = ref({ ...user });
if (!userToSave.value.subsidiariesId) {
  userToSave.value.subsidiariesId = [];
}
const { userRules } = useUserRules();
const userValidator = useVuelidate(userRules, userToSave.value);
if (cashDrawerDropdownProps) {
  cashDrawerDropdown.value = cashDrawerDropdownProps;
}

watch(
  () => userToSave.value.subsidiariesId,
  () => {
    cashDrawerDropdown.value = [];
    if (userToSave.value.subsidiariesId) {
      userToSave.value.subsidiariesId.map((x) => {
        let sub = subsidiaries.value.find((y) => y.id == x)!;
        sub.checkouts.map((z) => {
          cashDrawerDropdown.value.push({
            label: `${z.code} ${sub.businessname}`,
            value: z.id,
          });
        });
      });
    }
  }
);

watch(subsidiaries, () => {
  cashDrawerDropdown.value = [];
  if (userToSave.value.subsidiariesId) {
    userToSave.value.subsidiariesId.map((x) => {
      let sub = subsidiaries.value.find((y) => y.id == x)!;
      sub.checkouts.map((z) => {
        cashDrawerDropdown.value.push({
          label: `${z.code} ${sub.businessname}`,
          value: z.id,
        });
      });
    });
  }
});

const onUserSubmit = () => {
  userValidator.value.$validate();
  if (!userValidator.value.$error) {
    emit("user-submit", userToSave.value);
  } else {
    alert(JSON.stringify(userValidator.value.$errors.map((x) => x.$property)));
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12" md="6">
      <FormSeccion title="Informacin general">
        <VRow>
          <VCol cols="12">
            <InputSection label-message="Nombre del usuario" required>
              <VTextField
                variant="solo-filled"
                placeholder="name"
                v-model="userToSave.name"
              />
            </InputSection>
          </VCol>
          <VCol cols="12">
            <InputSection label-message="Correo del usuario" required>
              <VTextField
                variant="solo-filled"
                placeholder="email"
                v-model="userToSave.email"
              />
            </InputSection>
          </VCol>
          <VCol cols="12">
            <InputSection label-message="Username del usuario" required>
              <VTextField
                variant="solo-filled"
                placeholder="username"
                v-model="userToSave.username"
              />
            </InputSection>
          </VCol>
          <VCol cols="12">
            <InputSection label-message="Contraseña del usuario" required>
              <VTextField
                variant="solo-filled"
                placeholder="contraseña"
                v-model="userToSave.password"
              />
            </InputSection>
          </VCol>
        </VRow>
      </FormSeccion>
    </VCol>
    <VCol cols="12" md="6">
      <FormSeccion title="Datos empresariales">
        <VRow class="mt-1">
          <VCol cols="12">
            <InputSection label-message="Rol del usuario" required>
              <VSelect
                variant="solo-filled"
                flat
                placeholder="rol"
                :items="rolesDropdown"
                item-title="label"
                multiple
                item-value="value"
                :loading="isRolesLoading"
                v-model="userToSave.roles"
              >
                <template #selection="{ index, item }" v-if="isRolesLoading">
                  <p v-if="isRolesLoading">cargando...</p>
                </template>
              </VSelect>
            </InputSection>
          </VCol>
          <VCol cols="12">
            <InputSection label-message="Sucursal del usuario" required>
              <VSelect
                variant="solo-filled"
                flat
                placeholder="sucursal"
                :items="subsidiaryDropdown"
                item-title="label"
                multiple
                item-value="value"
                :loading="isSubsidiariesLoading"
                v-model="userToSave.subsidiariesId"
              >
                <template
                  #selection="{ index, item }"
                  v-if="isSubsidiariesLoading"
                >
                  <p v-if="isSubsidiariesLoading">cargando...</p>
                </template>
              </VSelect>
            </InputSection>
          </VCol>
          <VCol cols="12">
            <InputSection label-message="Caja del usuario" required>
              <VSelect
                placeholder="Caja"
                :items="cashDrawerDropdown"
                item-title="label"
                multiple
                :disabled="userToSave.subsidiariesId.length <= 0"
                item-value="value"
                :loading="isSubsidiariesLoading"
                v-model="userToSave.checkoutsId"
              >
                <template
                  #selection="{ index, item }"
                  v-if="isSubsidiariesLoading"
                >
                  <p v-if="isSubsidiariesLoading">cargando...</p>
                </template>
              </VSelect>
            </InputSection>
          </VCol>
        </VRow>
      </FormSeccion>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-end">
        <VBtn
          @click="onUserSubmit"
          :loading="isLoding"
          density="default"
          :prepend-icon="
            userToSave.id ? 'mdi-content-save-outline' : 'mdi-plus'
          "
          color="info"
          variant="elevated"
        >
          {{ formButtonText }}
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
