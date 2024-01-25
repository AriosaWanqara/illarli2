<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import usePaymentMethods from "../../compossables/paymentMethod/usePaymentMethods";
import usePaymentMethodMutations from "../../compossables/paymentMethod/usePaymentMethodMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import PaymentMethodsTableList from "../../components/paymentMethods/PaymentMethodsTableList.vue";
import type { PaymentMethod } from "../../models/PaymentMethod";
import { ref } from "vue";
import CreatePaymentMethodForm from "../../components/paymentMethods/CreatePaymentMethodForm.vue";
import { computed } from "vue";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";
import { useWindowSize } from "@vueuse/core";

const { paymentMethods } = usePaymentMethods();
const {
  deletePaymentMethodMutations,
  savePaymentMethodMutations,
  updatePaymentMethodMutations,
} = usePaymentMethodMutations();
const { width } = useWindowSize();

const paymentMethod = ref<PaymentMethod>({} as PaymentMethod);
const showConfirmModal = ref(false);
const showFormModal = ref(false);
const buttonText = ref("Añadir forma de pago");
const isCategoryFormLoading = ref(
  computed(
    () =>
      savePaymentMethodMutations.isPending.value ||
      updatePaymentMethodMutations.isPending.value
  )
);

const onDelete = (paymentMethodToDelete: PaymentMethod) => {
  showConfirmModal.value = true;
  paymentMethod.value = paymentMethodToDelete;
};

const onSelect = (selectedPaymentMethod: PaymentMethod) => {
  buttonText.value = "Actualizar forma de pago";
  paymentMethod.value = selectedPaymentMethod;
  if (width.value < 768) {
    showFormModal.value = true;
  }
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    deletePaymentMethodMutations.mutate(paymentMethod.value.id);
  }
  showConfirmModal.value = false;
  reset();
};

const onPaymentMethodSubmit = (newPaymentMethod: PaymentMethod) => {
  if (newPaymentMethod.id) {
    updatePaymentMethodMutations.mutate(newPaymentMethod);
  } else {
    newPaymentMethod.code_sri = "20";
    newPaymentMethod.accounting_account =
      "4fac6be4-0ece-43a5-a137-28f6ca5e9382";
    savePaymentMethodMutations.mutate(newPaymentMethod);
  }
};

const onModalShow = () => {
  reset();
  showFormModal.value = true;
};

const reset = () => {
  paymentMethod.value = {} as PaymentMethod;
  buttonText.value = "Añadir forma de pago";
};

watch(deletePaymentMethodMutations.isError, () => {
  if (deletePaymentMethodMutations.isError.value) {
    let x = deletePaymentMethodMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
    reset();
  }
});

watch(deletePaymentMethodMutations.isSuccess, () => {
  if (deletePaymentMethodMutations.isSuccess.value) {
    paymentMethods.value = paymentMethods.value.filter(
      (x) => x.id != deletePaymentMethodMutations.variables.value
    );
    reset();
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
    let response = updatePaymentMethodMutations.data.value;
    if (response) {
      for (let index = 0; index < paymentMethods.value.length; index++) {
        if (paymentMethods.value[index].id == response.id) {
          paymentMethods.value[index] = response;
        }
      }
    }
    reset();
  }
});
watch(savePaymentMethodMutations.isError, () => {
  if (savePaymentMethodMutations.isError.value) {
    let x = savePaymentMethodMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(savePaymentMethodMutations.isSuccess, () => {
  if (savePaymentMethodMutations.isSuccess.value) {
    let response = savePaymentMethodMutations.data.value;
    if (response) {
      paymentMethods.value = [response, ...paymentMethods.value];
    }
    reset();
  }
});
</script>

<template>
  <FormListContainer>
    <template #form>
      <ViewScaffold
        :title="paymentMethod.id ? 'Actualizar Pago' : 'Crear Pago'"
      >
        <template #default>
          <div class="tw-mb-3"></div>
          <CreatePaymentMethodForm
            :button-text="buttonText"
            :isLoading="isCategoryFormLoading"
            :payment-method="paymentMethod"
            @payment-method-submit="onPaymentMethodSubmit"
          />
        </template>
      </ViewScaffold>
    </template>
    <template #default>
      <ViewScaffold title="Formas de pago" class="tw-flex-1">
        <div class="">
          <div
            class="tw-flex tw-mb-5 tw-justify-between tw-items-center tw-px-2"
          >
            <div class="tw-max-w-sm tw-min-w-[200px]">
              <p class="tw-font-semibold">Todas las Formas de pago</p>
            </div>
            <div class="tw-hidden md:tw-block">
              <VBtn color="success" prepend-icon="mdi-plus" @click="reset"
                >Nuevo</VBtn
              >
            </div>
            <div class="md:tw-hidden">
              <VBtn color="success" prepend-icon="mdi-plus" @click="onModalShow"
                >Nuevo</VBtn
              >
            </div>
          </div>
          <PaymentMethodsTableList
            :is-delete-loading="false"
            :is-update-loading="false"
            :payment-method="paymentMethod"
            @delete-payment-methods="onDelete"
            @update-payment-methods="onSelect"
          />
          <VDialog v-model="showFormModal" max-width="400">
            <ViewScaffold
              :title="paymentMethod.id ? 'Actualizar Pago' : 'Crear Pago'"
            >
              <template #default>
                <div class="tw-mb-3"></div>
                <CreatePaymentMethodForm
                  :button-text="buttonText"
                  :isLoading="isCategoryFormLoading"
                  :payment-method="paymentMethod"
                  @payment-method-submit="onPaymentMethodSubmit"
                />
              </template>
            </ViewScaffold>
          </VDialog>
          <ConfirmDeleteDialog
            :dialog-text="'Esta seguro que desa borrar la Marca?'"
            :show-modal="showConfirmModal"
            :title="'Desea borrar'"
            @confirm-response="onConfirmReponse"
          />
        </div>
      </ViewScaffold>
    </template>
  </FormListContainer>
</template>

<style scoped></style>
