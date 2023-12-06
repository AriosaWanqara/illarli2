<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import usePaymentMethodMutations from "../../compossables/paymentMethod/usePaymentMethodMutations";
import usePaymentMethodRules from "../../compossables/paymentMethod/usePaymentMethodRules";
import type { PaymentMethod } from "../../models/PaymentMethod";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "vue";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";
import useSRITaxes from "../../compossables/SRITaxe/useSRITaxes";

interface props {
  propsPaymentMethod?: PaymentMethod;
}

const props = defineProps<props>();

const { savePaymentMethodMutations, updatePaymentMethodMutations } =
  usePaymentMethodMutations();
const { paymentMethodRules } = usePaymentMethodRules();
const { SRITaxesDropdown, SRITaxesHasError, isSRITaxesLoading } = useSRITaxes();
const paymentMethod = ref<PaymentMethod>({} as PaymentMethod);

if (props.propsPaymentMethod) {
  paymentMethod.value = { ...props.propsPaymentMethod };
}

const paymentMethodValidator = useVuelidate(paymentMethodRules, paymentMethod);
const router = useRouter();

const onPaymentMethodSubmit = () => {
  paymentMethodValidator.value.$validate();
  if (!paymentMethodValidator.value.$error) {
    if (paymentMethod.value.id) {
      updatePaymentMethodMutations.mutate(paymentMethod.value);
    } else {
      savePaymentMethodMutations.mutate(paymentMethod.value);
    }
  } else {
    alert(
      JSON.stringify(
        paymentMethodValidator.value.$errors.map((x) => x.$property)
      )
    );
  }
};

watch(savePaymentMethodMutations.isError, () => {
  if (savePaymentMethodMutations.isError.value) {
    let x = savePaymentMethodMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(savePaymentMethodMutations.isSuccess, () => {
  if (savePaymentMethodMutations.isSuccess.value) {
    router.push({ name: "payment-method-list" });
  }
});
watch(updatePaymentMethodMutations.isError, () => {
  if (updatePaymentMethodMutations.isError.value) {
    let x = updatePaymentMethodMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updatePaymentMethodMutations.isSuccess, () => {
  if (updatePaymentMethodMutations.isSuccess.value) {
    router.push({ name: "payment-method-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear Metodo">
    <template #actionBack>
      <RouterLink :to="{ name: 'payment-method-list' }">
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
        <VCol cols="6">
          <VTextField label="name" v-model="paymentMethod.name" />
        </VCol>
        <VCol cols="6">
          <VSelect
            label="SRI"
            :items="SRITaxesDropdown"
            itemTitle="label"
            itemValue="value"
            :loading="isSRITaxesLoading"
            v-model="paymentMethod.code"
          />
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onPaymentMethodSubmit"
            :loading="savePaymentMethodMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
