<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useRoles from "../../composables/rol/useRoles";
import useUser from "../../composables/user/useUser";
import useUserMutations from "../../composables/user/useUserMutations";
import useUserRules from "../../composables/user/useUserRules";
import type { User, userToSave } from "../../models/User";
import useSubsidiaries from "@dashboard/modules/config/composables/subsidiary/useSubsidiaries";
import type { Dropdown } from "@/models/Dropdown";
import { onUnmounted } from "vue";

const params = useRoute().params;
const router = useRouter();
const { isUserLoading, user, userHasError, roles } = useUser(
  params.id.toString()
);
const { updateUserMutations } = useUserMutations();
const { isSubsidiariesLoading, subsidiaryDropdown, subsidiaries } =
  useSubsidiaries();
const cashDrawerDropdown = ref<Dropdown[]>([]);
const { isRolesLoading, rolesHasError, rolesDropdown } = useRoles();
const { userRules } = useUserRules();

const userToSave = ref<userToSave>({} as userToSave);
const userValidator = useVuelidate(userRules, userToSave.value);

const onUserSubmit = () => {
  userValidator.value.$validate();
  if (!userValidator.value.$error) {
    updateUserMutations.mutate(userToSave.value);
  } else {
    alert(JSON.stringify(userValidator.value.$errors.map((x) => x.$property)));
  }
};

watch(updateUserMutations.isError, () => {
  if (updateUserMutations.isError.value) {
    let x = updateUserMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateUserMutations.isSuccess, () => {
  if (updateUserMutations.isSuccess.value) {
    router.push({ name: "users-list" });
  }
});

watch(
  subsidiaries,
  () => {
    if (subsidiaries.value.length > 0) {
      subsidiaries.value.map((x) => {
        let sub = x;
        sub.checkouts.map((y) => {
          cashDrawerDropdown.value.push({
            label: `${y.code} ${x.businessname}`,
            value: y.id,
          });
        });
      });
      console.log("asd");
    }
  },
  { deep: true }
);

watch(user, () => {
  userToSave.value.name = user.value.name;
  userToSave.value.email = user.value.email;
  userToSave.value.id = user.value.id;
  userToSave.value.username = user.value.username;
  userToSave.value.subsidiariesId = user.value.subsidiaries.map((x) => x.id);
  cashDrawerDropdown.value = [];
  userToSave.value.roles = roles.value;
  let checkouts: string[] = [];
  user.value.checkouts.map((x) => {
    checkouts.push(x.id);
  });
  userToSave.value.checkoutsId = checkouts;
});

onUnmounted(() => {
  user.value = {} as User;
  subsidiaries.value = [];
});
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
      <VRow class="mt-1" v-if="isUserLoading">
        <p>cargando</p>
      </VRow>
      <VRow class="mt-1" v-else-if="userHasError">
        <p>error</p>
      </VRow>
      <VRow class="mt-1" v-else>
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
          <VSelect
            label="roles"
            :items="rolesDropdown"
            item-title="label"
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
            item-value="value"
            multiple
            :loading="isSubsidiariesLoading"
            v-model="userToSave.subsidiariesId"
          />
        </VCol>
        <VCol cols="6" v-if="userToSave.subsidiariesId">
          <VSelect
            label="checkout"
            :items="cashDrawerDropdown"
            item-title="label"
            multiple
            item-value="value"
            :loading="isSubsidiariesLoading"
            v-model="userToSave.checkoutsId"
          />
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onUserSubmit"
            :loading="updateUserMutations.isPending.value"
          >
            crear
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
