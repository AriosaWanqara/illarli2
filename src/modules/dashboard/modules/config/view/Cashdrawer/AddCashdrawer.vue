<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useCashdrawerRules from "../../composables/cashdrawer/useCashdrawerRules";
import useCashdrawersMutations from "../../composables/cashdrawer/useCashdrawersMutations";
import useDocumentTypes from "../../composables/documentType/useDocumentTypes";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";
import type { Cashdrawer } from "../../models/Cashdrawer";

const { saveCashdrawerMutations } = useCashdrawersMutations();
const { cashdrawerRules } = useCashdrawerRules();
const { isSubsidiariesLoading, subsidiaryDropdown } = useSubsidiaries();
const router = useRouter();
const cashdrawer = ref<Cashdrawer>({} as Cashdrawer);
const cashdrawerValidator = useVuelidate(cashdrawerRules, cashdrawer);
const { documentTypeDropdown, isDocumentsTypeLoading } = useDocumentTypes();

const onCashDrawerSubmit = () => {
  cashdrawerValidator.value.$validate();
  if (!cashdrawerValidator.value.$error) {
    saveCashdrawerMutations.mutate(cashdrawer.value);
  } else {
    alert(
      JSON.stringify(cashdrawerValidator.value.$errors.map((x) => x.$message))
    );
  }
};

watch(saveCashdrawerMutations.isError, () => {
  if (saveCashdrawerMutations.isError.value) {
    let x = saveCashdrawerMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveCashdrawerMutations.isSuccess, () => {
  if (saveCashdrawerMutations.isSuccess.value) {
    router.push({ name: "config-cashdrawer-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear caja">
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
      <VRow class="mt-1">
        <VCol cols="6" class="py-0">
          <VTextField label="codigo" v-model="cashdrawer.code" />
        </VCol>
        <VCol cols="6" class="py-0">
          <VTextField label="observacion" v-model="cashdrawer.observation" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            label="subsidiary"
            :loading="isSubsidiariesLoading"
            v-model="cashdrawer.subsidiary_id"
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
            v-model="cashdrawer.document_type"
            :loading="isDocumentsTypeLoading"
            :items="documentTypeDropdown"
            item-title="label"
            item-value="value"
          />
        </VCol>
        <VCol cols="12">
          <VBtn @click="onCashDrawerSubmit"> crear </VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
