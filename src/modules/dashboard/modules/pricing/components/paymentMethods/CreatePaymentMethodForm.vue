<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import usePaymentMethodRules from "../../compossables/paymentMethod/usePaymentMethodRules";
import type { PaymentMethod } from "../../models/PaymentMethod";
import useSRIPaymentMethods from "../../compossables/SRI/useSRIPaymentMethods";

interface props {
  paymentMethod: PaymentMethod;
  buttonText: string;
  isLoading: boolean;
}

const props = defineProps<props>();
const emits = defineEmits(["payment-method-submit"]);
const { paymentMethodRules } = usePaymentMethodRules();
const {
  SRIPaymentMethodsDropdown,
  SRIPaymentMethodsHasError,
  isSRIPaymentMethodsLoading,
} = useSRIPaymentMethods();

const paymentMethodValidator = useVuelidate(
  paymentMethodRules,
  props.paymentMethod
);

const onPaymentMethodSubmit = () => {
  paymentMethodValidator.value.$reset();
  paymentMethodValidator.value.$validate();
  if (!paymentMethodValidator.value.$error) {
    emits("payment-method-submit", props.paymentMethod);
  } else {
    alert(JSON.stringify(paymentMethodValidator.value.$errors));
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase">
          Nombre<span class="tw-text-red-300">*</span>
        </label>
        <VTextField
          placeholder="Ingrese un nombre"
          v-model="props.paymentMethod.name"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400 tw-uppercase">
          Tipo de forma de pago<span class="tw-text-red-300">*</span>
        </label>
        <VSelect
          placeholder="seleccione una forma de pago"
          :items="SRIPaymentMethodsDropdown"
          item-title="label"
          item-value="value"
          :loading="isSRIPaymentMethodsLoading"
          v-model="props.paymentMethod.code_sri"
          :no-data-text="
            SRIPaymentMethodsHasError
              ? 'Error del servidor 🥲'
              : 'No hay registros'
          "
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-justify-end">
        <VBtn
          @click="onPaymentMethodSubmit"
          color="info"
          density="default"
          variant="elevated"
          :loading="isLoading"
          :prepend-icon="
            props.paymentMethod.id ? 'mdi-content-save-outline' : 'mdi-plus'
          "
          >{{ props.buttonText ?? "Guardar" }}</VBtn
        >
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
../../compossables/SRI/useSRITaxes
