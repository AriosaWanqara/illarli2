<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import AddPaymentMethod from "./AddPaymentMethod.vue";
import usePaymentMethod from "../../compossables/paymentMethod/usePaymentMethod";
import { useRoute } from "vue-router";

const params = useRoute().params;
const { isPaymentMethodsLoading, paymentMethod, paymentMethodsHasError } =
  usePaymentMethod(params.id.toString());
</script>

<template>
  <ViewScaffold v-if="isPaymentMethodsLoading">
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
      <p>cargando...</p>
    </template>
  </ViewScaffold>
  <ViewScaffold v-else-if="paymentMethodsHasError">
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
      <p>error...</p>
    </template>
  </ViewScaffold>
  <AddPaymentMethod v-else :propsPaymentMethod="paymentMethod" />
</template>

<style scoped></style>
