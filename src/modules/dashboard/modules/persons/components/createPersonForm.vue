<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import RecursiveInput from "@/modules/dashboard/components/shared/RecursiveInput.vue";
import useVuelidate from "@vuelidate/core";
import useProvidersRules from "../composables/provider/useProvidersRules";
import { allCivilStatusEnum } from "../constant/civilStatusEnum";
import { allGenders } from "../constant/genderEnum";
import type { Provider } from "../models/Provider";
import useRates from "../../pricing/compossables/rate/useRates";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

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
const { isRatesLoading, rates } = useRates();

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
        <InputSection label-message="Nombre de la persona" required>
          <VTextField
            variant="solo-filled"
            placeholder="Nombre"
            :error-messages="
              personValidator.name.$errors.map((x) => x.$message.toString())
            "
            v-model="props.person.name"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" md="6" class="py-0" v-if="showBasic">
        <InputSection label-message="Documento de identificacion" required>
          <VTextField
            variant="solo-filled"
            placeholder="identity"
            :error-messages="
              personValidator.identity.$errors.map((x) => x.$message.toString())
            "
            v-model="props.person.identity"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" class="py-0 tw-mt-3">
        <InputSection label-message="dirección del cliente">
          <VTextarea
            variant="solo-filled"
            hide-details
            placeholder="address"
            :error-messages="
              personValidator.address.$errors.map((x) => x.$message.toString())
            "
            v-model="props.person.address"
          />
        </InputSection>
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
        <InputSection label-message="Estado civil">
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
        </InputSection>
      </VCol>
      <VCol cols="12" md="6" class="py-0 tw-mt-3" v-if="showExtra">
        <InputSection label-message="Genero de la persona">
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
        </InputSection>
      </VCol>
    </VRow>
  </FormSeccion>
  <FormSeccion title="Tarifa" border class="tw-mt-3">
    <VRow class="py-0">
      <VCol cols="12" class="py-0">
        <InputSection label-message="Tarifa">
          <VSelect
            placeholder="Seleccione una tarifa"
            v-model="props.person.rate"
            return-object
            hide-details
            :loading="isRatesLoading"
            :items="rates"
            item-title="name"
            item-value="id"
          />
        </InputSection>
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
