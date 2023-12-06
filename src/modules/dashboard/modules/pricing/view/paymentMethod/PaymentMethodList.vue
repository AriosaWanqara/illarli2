<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import usePaymentMethods from "../../compossables/paymentMethod/usePaymentMethods";
import usePaymentMethodMutations from "../../compossables/paymentMethod/usePaymentMethodMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const { isPaymentMethodsLoading, paymentMethods, paymentMethodsHasError } =
  usePaymentMethods();
const { deletePaymentMethodMutations } = usePaymentMethodMutations();

const onDelete = (id: string) => {
  deletePaymentMethodMutations.mutate(id);
};

watch(deletePaymentMethodMutations.isError, () => {
  if (deletePaymentMethodMutations.isError.value) {
    let x = deletePaymentMethodMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(deletePaymentMethodMutations.isSuccess, () => {
  if (deletePaymentMethodMutations.isSuccess.value) {
    paymentMethods.value = paymentMethods.value.filter(
      (x) => x.id != deletePaymentMethodMutations.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold title="Metodos">
    <template #action>
      <RouterLink :to="{ name: 'payment-method-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isPaymentMethodsLoading">cargando</p>
      <p v-else-if="paymentMethodsHasError">error</p>
      <div v-for="paymentMethod in paymentMethods" v-else>
        {{ paymentMethod.name }}
        <RouterLink
          :to="{
            name: 'payment-method-update',
            params: { id: paymentMethod.id },
          }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(paymentMethod.id)"
          :loading="deletePaymentMethodMutations.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
