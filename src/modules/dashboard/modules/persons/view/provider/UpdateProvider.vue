<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useProvider from "../../composables/provider/useProvider";
import useProvidersMutations from "../../composables/provider/useProvidersMutations";
import useProvidersRules from "../../composables/provider/useProvidersRules";
import { allCivilStatusEnum } from "../../constant/civilStatusEnum";
import { allGenders } from "../../constant/genderEnum";

const { updateProviderMutation } = useProvidersMutations();
const params = useRoute().params;
const router = useRouter();
const { isProviderLoading, provider, providerHasError } = useProvider(
  params.id.toString()
);
const { providersRules } = useProvidersRules();
const providerToSave = ref(provider);
const providerValidator = useVuelidate(providersRules, providerToSave);

const onProviderSubmit = () => {
  providerValidator.value.$validate();
  if (!providerValidator.value.$error) {
    updateProviderMutation.mutate(providerToSave.value);
  } else {
    alert(
      JSON.stringify(providerValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(updateProviderMutation.isError, () => {
  if (updateProviderMutation.isError.value) {
    alert("bad");
  }
});
watch(updateProviderMutation.isSuccess, () => {
  if (updateProviderMutation.isSuccess.value) {
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
      <VRow class="mt-1" v-if="isProviderLoading">
        <VCol cols="12" class="py-1">
          <p>cargando...</p>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="providerHasError">
        <VCol cols="12" class="py-1">
          <p>error</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="6" class="py-1">
          <VTextField label="Nombre" v-model="providerToSave.name" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="phone" v-model="providerToSave.phones[0]" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="emails" v-model="providerToSave.emails[0]" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="identity" v-model="providerToSave.identity" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="address" v-model="providerToSave.address" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            :items="allCivilStatusEnum"
            label="Civil status"
            v-model="providerToSave.civil_status"
          />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            :items="allGenders"
            label="gender"
            v-model="providerToSave.gender"
            item-title="label"
            item-value="value"
          />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary" @click="onProviderSubmit">Crear</VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
