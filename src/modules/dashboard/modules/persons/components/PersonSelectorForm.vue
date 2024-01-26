<script setup lang="ts">
import { personTypeBasicMapping } from "@/const/personTypeEnum";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import clientImg from "@dashboard/assets/images/ic_client.png";
import employeeImg from "@dashboard/assets/images/ic_employee.png";
import providerImg from "@dashboard/assets/images/ic_provider.png";
import { personRolEnum } from "../constant/personRolEnum";
import type { Provider } from "../models/Provider";
import PersonTypeCard from "./PersonTypeCard.vue";

interface props {
  person: Provider;
  nameError: string[];
  identityError: string[];
}

const props = defineProps<props>();

const personType = [
  { img: clientImg, label: "Cliente", value: personRolEnum.CUSTOMER },
  { img: providerImg, label: "Proveedor", value: personRolEnum.SUPPLIER },
  { img: employeeImg, label: "Empleado", value: personRolEnum.EMPLOYEE },
];
</script>

<template>
  <div>
    <UIParentCardV2>
      <template #title>
        <div class="tw-h-[100px]">
          <div
            class="tw-relative bg-secondary tw-h-[68px] tw-flex tw-overflow-visible tw-justify-center"
          >
            <img :src="employeeImg" alt="" class="tw-absolute -tw-top-1" />
          </div>
        </div>
      </template>
      <div class="tw-px-7 tw-py-5">
        <head
          class="tw-w-full tw-flex tw-justify-center tw-items-center tw-flex-col"
        >
          <h2 class="title-1">
            <span class="title-1 tw-font-semibold">Nombre:</span>
            {{ props.person.name }}
          </h2>
          <p class="tw-text-sm tw-text-gray-400">
            Identificacion: {{ props.person.identity }}
          </p>
        </head>
        <FormSeccion title="Tipo" border class="tw-mt-2">
          <template #subtitle>
            <p class="tw-text-gray-400 tw-text-sm tw-mt-1">
              Escoge uno o varios opciones
            </p>
          </template>
          <v-item-group mandatory v-model="props.person.roles" multiple>
            <div class="tw-flex tw-gap-4 tw-justify-center tw-flex-wrap">
              <v-item
                v-slot="{ isSelected, toggle }"
                v-for="person in personType"
                :value="person.value"
              >
                <PersonTypeCard
                  :img="person.img"
                  :label="person.label"
                  :is-selected="isSelected!"
                  :toggle="toggle!"
                ></PersonTypeCard>
              </v-item>
            </div>
          </v-item-group>
        </FormSeccion>
        <FormSeccion title="Información General" border class="tw-mt-2">
          <VRow>
            <VCol class="py-0" cols="12">
              <div class="tw-flex tw-flex-col tw-gap-1 tw-mt-1">
                <label
                  for=""
                  class="tw-font-semibold tw-text-gray-400 tw-uppercase"
                >
                  TIPO DE IDENTIFICACIÓN<span class="tw-text-red-300">*</span>
                </label>
                <VSelect
                  hide-details
                  :items="personTypeBasicMapping"
                  item-title="label"
                  item-value="value"
                  v-model="props.person.identity_type"
                  placeholder="Seleccione un tipo de identificación"
                />
              </div>
            </VCol>
            <VCol class="py-0" cols="12">
              <div class="tw-flex tw-flex-col tw-gap-1 tw-mt-1">
                <label
                  for=""
                  class="tw-font-semibold tw-text-gray-400 tw-uppercase"
                >
                  N. de Documento<span class="tw-text-red-300">*</span>
                </label>
                <VTextField
                  hide-details
                  :error-messages="props.identityError"
                  v-model="props.person.identity"
                  placeholder="Seleccione un tipo de identificación"
                />
              </div>
            </VCol>
            <VCol class="py-0" cols="12">
              <div class="tw-flex tw-flex-col tw-gap-1 tw-mt-1">
                <label
                  for=""
                  class="tw-font-semibold tw-text-gray-400 tw-uppercase"
                >
                  Nombre completo<span class="tw-text-red-300">*</span>
                </label>
                <VTextField
                  hide-details
                  :error-messages="props.nameError"
                  v-model="props.person.name"
                  placeholder="Seleccione un tipo de identificación"
                />
              </div>
            </VCol>
          </VRow>
        </FormSeccion>
      </div>
    </UIParentCardV2>
  </div>
</template>

<style scoped>
.border-r-20 {
  border-radius: 20px 20px 10px 10px !important;
}
.overflow-visible {
  overflow: visible !important;
}
</style>
