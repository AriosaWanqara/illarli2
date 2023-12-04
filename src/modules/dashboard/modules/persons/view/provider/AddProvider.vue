<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useProvidersMutations from "../../composables/provider/useProvidersMutations";
import { watch } from "vue";
import useProvidersRules from "../../composables/provider/useProvidersRules";
import type { Provider } from "../../models/Provider";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import { allCivilStatusEnum } from "../../constant/civilStatusEnum";
import { allGenders } from "../../constant/genderEnum";
import type { AxiosError } from "axios";
import { personRolEnum } from "../../constant/personRolEnum";

const { saveProviderMutation } = useProvidersMutations();
allCivilStatusEnum;
allGenders;
const router = useRouter();
const { providersRules } = useProvidersRules();
const provider = ref<Provider>({
  phones: [] as string[],
  emails: [] as string[],
  roles: [personRolEnum.CUSTOMER],
} as Provider);
const providerValidator = useVuelidate(providersRules, provider);

const onProviderSubmit = () => {
  providerValidator.value.$validate();
  if (!providerValidator.value.$error) {
    saveProviderMutation.mutate(provider.value);
  } else {
    alert(
      JSON.stringify(providerValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(saveProviderMutation.isError, () => {
  if (saveProviderMutation.isError.value) {
    let error = saveProviderMutation.error.value as AxiosError;
    alert(JSON.stringify(error.response?.data));
  }
});
watch(saveProviderMutation.isSuccess, () => {
  if (saveProviderMutation.isSuccess.value) {
    router.push({ name: "provider-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear proveedor">
    <template #actionBack>
      <RouterLink :to="{ name: 'provider-list' }">
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
        <VCol cols="6" class="py-1">
          <VTextField label="Nombre" v-model="provider.name" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="phone" v-model="provider.phones[0]" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="emails" v-model="provider.emails[0]" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="identity" v-model="provider.identity" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="address" v-model="provider.address" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            :items="allCivilStatusEnum"
            label="Civil status"
            v-model="provider.civil_status"
          />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            :items="allGenders"
            label="gender"
            v-model="provider.gender"
            item-title="label"
            item-value="value"
          />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onProviderSubmit"
            :loading="saveProviderMutation.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
