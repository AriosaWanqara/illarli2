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
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import productBanerImg from "@dashboard/assets/images/ic_provider.png";

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
  <FormListContainer>
    <template #form>
      <UIParentCardV2>
        <template #title>
          <div class="tw-h-[83px]">
            <div
              class="tw-h-[55px] bg-secondary tw-relative tw-w-full tw-flex tw-justify-center"
            >
              <div
                class="tw-bg-white tw-rounded-full tw-h-[75px] tw-w-[75px] tw-flex tw-justify-center tw-items-center border-secondary tw-top-2 tw-absolute"
              >
                <img :src="productBanerImg" alt="" height="40" width="60" />
              </div>
            </div>
          </div>
        </template>
        <FormSeccion title="Informacin general" class="tw-px-4" border>
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
      </UIParentCardV2>
    </template>
    <template #default>
      <div class="md:tw-hidden">
        <UIParentCardV2 class="tw-mb-2">
          <FormSeccion title="Informacin general" class="tw-p-4" border>
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
        </UIParentCardV2>
      </div>
      <UIParentCardV2>
        <FormSeccion title="Datos empresariales" class="tw-p-4" border>
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
            <VCol cols="12">
              <div class="tw-flex tw-justify-end tw-gap-3">
                <VBtn
                  @click=""
                  :loading="isLoding"
                  density="default"
                  color="borderColor"
                  variant="outlined"
                >
                  <p class="tw-text-gray-400">cancelar</p>
                </VBtn>
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
        </FormSeccion>
      </UIParentCardV2>
    </template>
  </FormListContainer>
</template>

<style scoped></style>
