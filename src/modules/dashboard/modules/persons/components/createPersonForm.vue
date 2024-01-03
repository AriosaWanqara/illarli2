<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useProvidersRules from "../composables/provider/useProvidersRules";
import { allCivilStatusEnum } from "../constant/civilStatusEnum";
import { allGenders } from "../constant/genderEnum";
import type { Provider } from "../models/Provider";
import { ref } from "vue";

interface props {
  person: Provider;
  isLoading: boolean;
}

const { person } = defineProps<props>();
const emit = defineEmits(["person-submit"]);
const personToSave = ref({ ...person });
const { providersRules } = useProvidersRules();
const personValidator = useVuelidate(providersRules, personToSave);

const onPersonSubmit = () => {
  personValidator.value.$validate();
  if (!personValidator.value.$error) {
    emit("person-submit", personToSave.value);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12" class="py-1 tw-mb-1">
      <VDivider />
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Nombre de la persona</label>
        <VTextField label="Nombre" v-model="personToSave.name" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Telefono de la persona</label>
        <VTextField label="phone" v-model="personToSave.phones[0]" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Correo de la persona</label>
        <VTextField label="emails" v-model="personToSave.emails[0]" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"
          >Documento de identificacion</label
        >
        <VTextField label="identity" v-model="personToSave.identity" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Direccion</label>
        <VTextField label="address" v-model="personToSave.address" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Estado civil</label>
        <VSelect
          :items="allCivilStatusEnum"
          label="Civil status"
          v-model="personToSave.civil_status"
          item-title="label"
          item-value="value"
        />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Genero de la persona</label>
        <VSelect
          :items="allGenders"
          label="gender"
          v-model="personToSave.gender"
          item-title="label"
          item-value="value"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <VBtn color="primary" @click="onPersonSubmit" :loading="isLoading"
        >Crear</VBtn
      >
    </VCol>
  </VRow>
</template>

<style scoped></style>
