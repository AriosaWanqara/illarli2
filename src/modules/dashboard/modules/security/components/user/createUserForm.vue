<script setup lang="ts">
import { ref } from "vue";
import type { userToSave } from "../../models/User";
import useRoles from "../../composables/rol/useRoles";
import useSubsidiaries from "../../../config/composables/subsidiary/useSubsidiaries";
import type { Dropdown } from "@/models/Dropdown";
import { watch } from "vue";
import useUserRules from "../../composables/user/useUserRules";
import useVuelidate from "@vuelidate/core";

interface props {
  isLoding: boolean;
  user: userToSave;
  cashDrawerDropdownProps?: Dropdown[];
}

const { user, cashDrawerDropdownProps } = defineProps<props>();
const emit = defineEmits(["user-submit"]);
const { isRolesLoading, rolesHasError, rolesDropdown } = useRoles();
const { isSubsidiariesLoading, subsidiaryDropdown, subsidiaries } =
  useSubsidiaries();
const cashDrawerDropdown = ref<Dropdown[]>([]);
const userToSave = ref({ ...user });
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
  <VRow class="mt-1">
    <VCol cols="12" class="tw-mb-1">
      <VDivider />
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Nombre del usuario </label>
        <VTextField placeholder="name" v-model="userToSave.name" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Correo del usuario </label>
        <VTextField placeholder="email" v-model="userToSave.email" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">
          Username del usuario
          <VTextField placeholder="username" v-model="userToSave.username" />
        </label>
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">
          Contraseña del usuario
          <VTextField placeholder="contraseña" v-model="userToSave.password" />
        </label>
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Rol del usuario </label>
        <VSelect
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
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Sucursal del usuario </label>
        <VSelect
          placeholder="sucursal"
          :items="subsidiaryDropdown"
          item-title="label"
          multiple
          item-value="value"
          :loading="isSubsidiariesLoading"
          v-model="userToSave.subsidiariesId"
        >
          <template #selection="{ index, item }" v-if="isSubsidiariesLoading">
            <p v-if="isSubsidiariesLoading">cargando...</p>
          </template>
        </VSelect>
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0" v-if="userToSave.subsidiariesId">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Caja del usuario </label>
        <VSelect
          placeholder="Caja"
          :items="cashDrawerDropdown"
          item-title="label"
          multiple
          item-value="value"
          :loading="isSubsidiariesLoading"
          v-model="userToSave.checkoutsId"
        >
          <template #selection="{ index, item }" v-if="isSubsidiariesLoading">
            <p v-if="isSubsidiariesLoading">cargando...</p>
          </template>
        </VSelect>
      </div>
    </VCol>
    <VCol cols="12">
      <VBtn @click="onUserSubmit" :loading="isLoding"> crear </VBtn>
    </VCol>
  </VRow>
</template>

<style scoped></style>
