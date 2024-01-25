<script setup lang="ts">
import type { Header } from "vue3-easy-data-table";
import usePaymentMethods from "../../compossables/paymentMethod/usePaymentMethods";
import type { PaymentMethod } from "../../models/PaymentMethod";
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  paymentMethod: PaymentMethod;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["update-payment-methods", "delete-payment-methods"]);

const { isPaymentMethodsLoading, paymentMethods, paymentMethodsHasError } =
  usePaymentMethods();

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Codigo", value: "code_sri" },
  { text: "", value: "actions", width: 110 },
];

const onRateSelected = (paymentMethod: PaymentMethod) => {
  emits("update-payment-methods", paymentMethod);
};

const onDelete = (paymentMethod: PaymentMethod) => {
  emits("delete-payment-methods", paymentMethod);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isPaymentMethodsLoading"
    :item="paymentMethod"
    :items="paymentMethods"
    :is-error="paymentMethodsHasError"
    :search="search"
  >
    <template #actions="{ item }">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            color="black"
            v-bind="props"
            variant="text"
            :loading="isUpdateLoading"
            @click="onRateSelected(item)"
          >
            <Icon icon="lucide:pencil" />
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Delete">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            color="error"
            variant="text"
            @click="onDelete(item)"
            :loading="isDeleteLoading"
          >
            <Icon icon="mdi:trash-can-outline" />
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </BaseTableComponent>
</template>

<style scoped></style>
