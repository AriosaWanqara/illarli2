<script setup lang="ts">
import { ref } from "vue";
import type { Cashdrawer } from "../../models/Cashdrawer";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";
import useDocumentTypes from "../../composables/documentType/useDocumentTypes";
import useCashdrawerRules from "../../composables/cashdrawer/useCashdrawerRules";
import useVuelidate from "@vuelidate/core";

interface props {
  cashdrawer: Cashdrawer;
  isLoading: boolean;
}

const { cashdrawer } = defineProps<props>();
const emits = defineEmits(["submit-cashdrawer"]);
console.log(cashdrawer);

const { isSubsidiariesLoading, subsidiaryDropdown } = useSubsidiaries();
const { documentTypeDropdown, isDocumentsTypeLoading } = useDocumentTypes();

const cashdrawerToSave = ref({ ...cashdrawer });
const { cashdrawerRules } = useCashdrawerRules();
const cashdrawerValidator = useVuelidate(cashdrawerRules, cashdrawerToSave);

const onCashDrawerSubmit = () => {
  cashdrawerValidator.value.$validate();
  if (!cashdrawerValidator.value.$error) {
    emits("submit-cashdrawer", cashdrawerToSave.value);
  }
};
</script>

<template>
  <VRow class="mt-1">
    <VCol cols="12" class="py-0 tw-mb-4">
      <VDivider></VDivider>
    </VCol>
    <VCol cols="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Codigo de la caja*</label>

        <VTextField placeholder="codigo" v-model="cashdrawerToSave.code" />
      </div>
    </VCol>
    <VCol cols="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Observacion</label>

        <VTextField
          placeholder="observacion"
          v-model="cashdrawerToSave.observation"
        />
      </div>
    </VCol>
    <VCol cols="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Sucursal de la caja*</label>

        <VSelect
          placeholder="subsidiary"
          :loading="isSubsidiariesLoading"
          v-model="cashdrawerToSave.subsidiary_id"
          :items="subsidiaryDropdown"
          item-title="label"
          item-value="value"
        >
          <template #selection="{ index, item }" v-if="isSubsidiariesLoading">
            <p>Cargando...</p>
          </template>
        </VSelect>
      </div>
    </VCol>
    <VCol cols="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Tipo de documento*</label>

        <VSelect
          placeholder="Tipo de documento"
          multiple
          chips
          v-model="cashdrawerToSave.document_type"
          :loading="isDocumentsTypeLoading"
          :items="documentTypeDropdown"
          item-title="label"
          item-value="value"
        >
          <template #selection="{ index, item }" v-if="isDocumentsTypeLoading">
            <p>Cargando...</p>
          </template>
        </VSelect>
      </div>
    </VCol>
    <VCol cols="12">
      <VBtn @click="onCashDrawerSubmit" :loading="isLoading"> crear </VBtn>
    </VCol>
  </VRow>
</template>

<style scoped></style>
