<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useCashdrawer from "../../composables/cashdrawer/useCashdrawer";
import useCashdrawerRules from "../../composables/cashdrawer/useCashdrawerRules";
import useCashdrawersMutations from "../../composables/cashdrawer/useCashdrawersMutations";
import useDocumentTypes from "../../composables/documentType/useDocumentTypes";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";

const { updateCashdrawerMutations } = useCashdrawersMutations();
const { documentTypeDropdown, isDocumentsTypeLoading } = useDocumentTypes();
const { isSubsidiariesLoading, subsidiaryDropdown } = useSubsidiaries();
const params = useRoute().params;
const router = useRouter();
const { cashdrawer, cashdrawerHasError, isCashdrawerLoading } = useCashdrawer(
  params.id.toString()
);
const { cashdrawerRules } = useCashdrawerRules();
const cashdrawerToSave = ref(cashdrawer);
const cashdrawerValidator = useVuelidate(cashdrawerRules, cashdrawerToSave);

const onCashDrawerSubmit = () => {
  cashdrawerValidator.value.$validate();
  if (!cashdrawerValidator.value.$error) {
    updateCashdrawerMutations.mutate(cashdrawerToSave.value);
  } else {
    alert(
      JSON.stringify(cashdrawerValidator.value.$errors.map((x) => x.$message))
    );
  }
};

watch(updateCashdrawerMutations.isError, () => {
  if (updateCashdrawerMutations.isError.value) {
    let x = updateCashdrawerMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateCashdrawerMutations.isSuccess, () => {
  if (updateCashdrawerMutations.isSuccess.value) {
    router.push({ name: "config-cashdrawer-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Caja">
    <template #actionBack>
      <RouterLink :to="{ name: 'config-cashdrawer-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>

    <template #default>
      <VRow class="mt-1" v-if="isCashdrawerLoading">
        <VCol cols="12">
          <p>Cargando..</p>
        </VCol>
        <VCol cols="12">
          <VBtn color="primary">crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="cashdrawerHasError">
        <VCol cols="12">
          <p>error..</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="6" class="py-0">
          <VTextField label="codigo" v-model="cashdrawerToSave.code" />
        </VCol>
        <VCol cols="6" class="py-0">
          <VTextField
            label="observacion"
            v-model="cashdrawerToSave.observation"
          />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            label="subsidiary"
            :loading="isSubsidiariesLoading"
            v-model="cashdrawerToSave.subsidiary_id"
            :items="subsidiaryDropdown"
            item-title="label"
            item-value="value"
          />
        </VCol>
        <VCol cols="6" class="py-0">
          <VSelect
            label="Tipo de documento"
            multiple
            chips
            v-model="cashdrawerToSave.document_type"
            :loading="isDocumentsTypeLoading"
            :items="documentTypeDropdown"
            item-title="label"
            item-value="value"
          />
        </VCol>
        <VCol cols="12">
          <VBtn color="primary" @click="onCashDrawerSubmit">crear</VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
