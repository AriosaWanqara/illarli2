<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useCashdrawerRules from "../../composables/cashdrawer/useCashdrawerRules";
import useDocumentTypes from "../../composables/documentType/useDocumentTypes";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";
import type { Cashdrawer } from "../../models/Cashdrawer";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

interface props {
  cashdrawer: Cashdrawer;
  isLoading: boolean;
  formButtonText: string;
}

const props = defineProps<props>();
const emits = defineEmits(["submit-cashdrawer"]);

const { isSubsidiariesLoading, subsidiaryDropdown } = useSubsidiaries();
const { documentTypeDropdown, isDocumentsTypeLoading } = useDocumentTypes();

const onCashDrawerSubmit = () => {
  const { cashdrawerRules } = useCashdrawerRules();
  const cashdrawerValidator = useVuelidate(cashdrawerRules, props.cashdrawer);
  cashdrawerValidator.value.$validate();
  if (!cashdrawerValidator.value.$error) {
    emits("submit-cashdrawer", props.cashdrawer);
  }
};
</script>

<template>
  <VRow class="mt-1">
    <VCol cols="12" class="py-0">
      <InputSection label-message="Codigo de la caja " required>
        <VTextField
          placeholder="codigo"
          v-model="props.cashdrawer.code"
          variant="solo-filled"
        />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Sucursal de la caja" required>
        <VSelect
          variant="solo-filled"
          flat
          placeholder="subsidiary"
          :loading="isSubsidiariesLoading"
          v-model="props.cashdrawer.subsidiary_id"
          :items="subsidiaryDropdown"
          item-title="label"
          item-value="value"
        />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Tipo de documento" required>
        <VSelect
          variant="solo-filled"
          flat
          placeholder="Tipo de documento"
          multiple
          chips
          v-model="props.cashdrawer.document_type"
          :loading="isDocumentsTypeLoading"
          :items="documentTypeDropdown"
          item-title="label"
          item-value="value"
        />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Observacion">
        <VTextarea
          variant="solo-filled"
          flat
          placeholder="observacion"
          v-model="props.cashdrawer.observation"
        />
      </InputSection>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-end">
        <VBtn
          @click="onCashDrawerSubmit"
          :loading="isLoading"
          color="info"
          density="default"
          :prepend-icon="
            props.cashdrawer.id ? 'mdi-content-save-outline' : 'mdi-plus'
          "
          variant="elevated"
        >
          {{ props.formButtonText }}
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
