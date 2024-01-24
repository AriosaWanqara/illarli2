<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import RecursiveInput from "@/modules/dashboard/components/shared/RecursiveInput.vue";
import useVuelidate from "@vuelidate/core";
import useProvidersRules from "../composables/provider/useProvidersRules";
import { allCivilStatusEnum } from "../constant/civilStatusEnum";
import { allGenders } from "../constant/genderEnum";
import type { Provider } from "../models/Provider";

interface props {
  person: Provider;
  isLoading: boolean;
  formButtonText: string;
  showBasic?: true;
  showExtra?: true;
}

const props = defineProps<props>();
const emit = defineEmits(["person-submit"]);
const { providersRules } = useProvidersRules();
const personValidator = useVuelidate(providersRules, props.person);

const onPersonSubmit = () => {
  personValidator.value.$validate();
  if (!personValidator.value.$error) {
    emit("person-submit", props.person);
  } else {
    emit("person-submit");
    alert(JSON.stringify(personValidator.value.name));
  }
};
</script>

<template>
  <FormSeccion title="Datos General" border>
    <VRow>
      <VCol cols="12" md="6" class="py-0" v-if="showBasic">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400"
            >Nombre de la persona</label
          >
          <VTextField
            variant="solo-filled"
            placeholder="Nombre"
            :error-messages="
              personValidator.name.$errors.map((x) => x.$message.toString())
            "
            v-model="props.person.name"
          />
        </div>
      </VCol>
      <VCol cols="12" md="6" class="py-0" v-if="showBasic">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400"
            >Documento de identificacion</label
          >
          <VTextField
            variant="solo-filled"
            placeholder="identity"
            :error-messages="
              personValidator.identity.$errors.map((x) => x.$message.toString())
            "
            v-model="props.person.identity"
          />
        </div>
      </VCol>
      <VCol cols="12" class="py-0 tw-mt-3">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase"
            >dirección del cliente
          </label>
          <VTextarea
            variant="solo-filled"
            hide-details
            placeholder="address"
            :error-messages="
              personValidator.address.$errors.map((x) => x.$message.toString())
            "
            v-model="props.person.address"
          />
        </div>
      </VCol>
      <RecursiveInput
        :col-number="12"
        placeholder="Ingrese un correo"
        label-message="Correo electronico"
        is-required
        :error-message="
          personValidator.emails.$errors
            .map((x) => x.$message.toString())
            .toString()
        "
        :value="props.person.emails"
        @model-update="(params) => (props.person.emails = params)"
      />
      <RecursiveInput
        :col-number="6"
        placeholder="Ingrese un telefono"
        label-message="Telefono"
        is-required
        :error-message="
          personValidator.emails.$errors
            .map((x) => x.$message.toString())
            .toString()
        "
        :value="props.person.phones"
        @model-update="(params) => (props.person.phones = params)"
      />

      <VCol cols="12" md="6" class="py-0 tw-mt-3" v-if="showExtra">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400"
            >Estado civil</label
          >
          <VSelect
            variant="solo-filled"
            flat
            hide-details
            :items="allCivilStatusEnum"
            placeholder="Civil status"
            :error-messages="
              personValidator.civil_status.$errors.map((x) =>
                x.$message.toString()
              )
            "
            v-model="props.person.civil_status"
            item-title="label"
            item-value="value"
          />
        </div>
      </VCol>
      <VCol cols="12" md="6" class="py-0 tw-mt-3" v-if="showExtra">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-font-semibold tw-text-gray-400"
            >Genero de la persona</label
          >
          <VSelect
            variant="solo-filled"
            flat
            hide-details
            :items="allGenders"
            placeholder="gender"
            :error-messages="
              personValidator.gender.$errors.map((x) => x.$message.toString())
            "
            v-model="props.person.gender"
            item-title="label"
            item-value="value"
          />
        </div>
      </VCol>
    </VRow>
  </FormSeccion>
  <FormSeccion title="Tarifa" border class="tw-mt-3">
    <VRow class="py-0">
      <VCol cols="12" class="py-0">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-text-gray-400 tw-font-semibold tw-uppercase">
            Tarifa
          </label>
          <VSelect
            placeholder="Seleccione una tarifa"
            v-model="props.person.rate"
            return-object
            hide-details
            item-title="name"
            item-value="id"
          />
        </div>
      </VCol>
      <VCol cols="12" class="py-0 tw-mt-8">
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
  </FormSeccion>
</template>

<style scoped></style>
