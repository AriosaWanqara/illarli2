<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useSubsidiariesMutations from "../../composables/subsidiary/useSubsidiariesMutations";
import useSubsidiary from "../../composables/subsidiary/useSubsidiary";
import useSubsidiaryRules from "../../composables/subsidiary/useSubsidiaryRules";

const { subsidiaryRules } = useSubsidiaryRules();
const params = useRoute().params;
const { isSubsidiaryLoading, subsidiary, subsidiaryHasError, subsidiaryError } =
  useSubsidiary(params.id.toString());
const brandToSave = ref({ ...subsidiary.value });
const subsidiaryValidator = useVuelidate(subsidiaryRules, brandToSave);
const { updateSubsidiaryMutations } = useSubsidiariesMutations();
const router = useRouter();
const error = ref(subsidiaryError.value as AxiosError);

const onSubsidiarySubmit = () => {
  subsidiaryValidator.value.$validate();
  if (!subsidiaryValidator.value.$error) {
    updateSubsidiaryMutations.mutate(brandToSave.value);
  } else {
    alert(
      JSON.stringify(subsidiaryValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(updateSubsidiaryMutations.isError, () => {
  if (updateSubsidiaryMutations.isError.value) {
    let x = updateSubsidiaryMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(updateSubsidiaryMutations.isSuccess, () => {
  if (updateSubsidiaryMutations.isSuccess.value) {
    router.push({ name: "config-subsidiaries-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Sucursal">
    <template #actionBack>
      <RouterLink :to="{ name: 'config-subsidiaries-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-1" v-if="isSubsidiaryLoading">
        <VCol cols="12" class="py-1">
          <p>cargando ...</p>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary" @click="onSubsidiarySubmit">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="subsidiaryHasError">
        <VCol cols="12" class="py-1">
          <p>{{ error }}</p>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary" @click="onSubsidiarySubmit">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="6" class="py-1">
          <VTextField
            label="business name"
            v-model="brandToSave.businessname"
          />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="address" v-model="brandToSave.address" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="phone" v-model="brandToSave.phone" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onSubsidiarySubmit"
            :loading="updateSubsidiaryMutations.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
