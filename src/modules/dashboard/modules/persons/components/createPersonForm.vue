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
  formButtonText: string;
}

const { person, formButtonText } = defineProps<props>();
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
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Nombre de la persona</label
        >
        <VTextField
          variant="solo-filled"
          placeholder="Nombre"
          v-model="personToSave.name"
        />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Telefono de la persona</label
        >
        <VTextField
          variant="solo-filled"
          placeholder="phone"
          v-model="personToSave.phones[0]"
        />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Correo de la persona</label
        >
        <VTextField
          variant="solo-filled"
          placeholder="emails"
          v-model="personToSave.emails[0]"
        />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Documento de identificacion</label
        >
        <VTextField
          variant="solo-filled"
          placeholder="identity"
          v-model="personToSave.identity"
        />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Direccion</label
        >
        <VTextField
          variant="solo-filled"
          placeholder="address"
          v-model="personToSave.address"
        />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Estado civil</label
        >
        <VSelect
          variant="solo-filled"
          flat
          :items="allCivilStatusEnum"
          placeholder="Civil status"
          v-model="personToSave.civil_status"
          item-title="label"
          item-value="value"
        />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400"
          >Genero de la persona</label
        >
        <VSelect
          variant="solo-filled"
          flat
          :items="allGenders"
          placeholder="gender"
          v-model="personToSave.gender"
          item-title="label"
          item-value="value"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-justify-end">
        <VBtn
          color="info"
          density="default"
          @click="onPersonSubmit"
          :loading="isLoading"
          variant="elevated"
          :prepend-icon="person.id ? 'mdi-content-save-outline' : 'mdi-plus'"
          >{{ formButtonText }}</VBtn
        >
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
