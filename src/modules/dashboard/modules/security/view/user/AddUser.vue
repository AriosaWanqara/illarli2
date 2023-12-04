<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import useRoles from "../../composables/rol/useRoles";
import useUserMutations from "../../composables/user/useUserMutations";
import useUserRules from "../../composables/user/useUserRules";
import type { userToSave } from "../../models/User";

import type { Dropdown } from "@/models/Dropdown";
import useSubsidiaries from "@dashboard/modules/config/composables/subsidiary/useSubsidiaries";
import { useRouter } from "vue-router";

const { saveUserMutations } = useUserMutations();
const { isRolesLoading, rolesHasError, rolesDropdown } = useRoles();
const { isSubsidiariesLoading, subsidiaryDropdown, subsidiaries } =
  useSubsidiaries();
const { userRules } = useUserRules();
const router = useRouter();
const cashDrawerDropdown = ref<Dropdown[]>([]);
const userToSave = ref<userToSave>({} as userToSave);
const userValidator = useVuelidate(userRules, userToSave.value);

const onUserSubmit = () => {
  userValidator.value.$validate();
  if (!userValidator.value.$error) {
    saveUserMutations.mutate(userToSave.value);
  } else {
    alert(JSON.stringify(userValidator.value.$errors.map((x) => x.$property)));
  }
};

watch(saveUserMutations.isError, () => {
  if (saveUserMutations.isError.value) {
    let x = saveUserMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveUserMutations.isSuccess, () => {
  if (saveUserMutations.isSuccess.value) {
    router.push({ name: "users-list" });
  }
});

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
</script>

<template>
  <ViewScaffold title="Crear usuario">
    <template #actionBack>
      <RouterLink :to="{ name: 'users-list' }">
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
          <VTextField label="name" v-model="userToSave.name" />
        </VCol>
        <VCol cols="6">
          <VTextField label="email" v-model="userToSave.email" />
        </VCol>
        <VCol cols="6">
          <VTextField label="username" v-model="userToSave.username" />
        </VCol>
        <VCol cols="6">
          <VTextField label="password" v-model="userToSave.password" />
        </VCol>
        <VCol cols="6">
          <VSelect
            label="roles"
            :items="rolesDropdown"
            item-title="label"
            multiple
            item-value="value"
            :loading="isRolesLoading"
            v-model="userToSave.roles"
          />
        </VCol>
        <VCol cols="6">
          <VSelect
            label="subsidiary"
            :items="subsidiaryDropdown"
            item-title="label"
            multiple
            item-value="value"
            :loading="isSubsidiariesLoading"
            v-model="userToSave.subsidiariesId"
          />
        </VCol>
        <VCol cols="6" v-if="userToSave.subsidiariesId">
          <VSelect
            label="subsidiary"
            :items="cashDrawerDropdown"
            item-title="label"
            multiple
            item-value="value"
            v-model="userToSave.checkoutsId"
          />
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onUserSubmit"
            :loading="saveUserMutations.isPending.value"
          >
            crear
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
