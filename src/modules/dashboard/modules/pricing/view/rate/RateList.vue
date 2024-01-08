<script setup lang="ts">
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useWindowSize } from "@vueuse/core";
import type { AxiosError } from "axios";
import { computed, ref, watch } from "vue";
import createRateForm from "../../components/rate/createRateForm.vue";
import RatesTableList from "../../components/rate/ratesTableList.vue";
import useRateMutations from "../../compossables/rate/useRateMutations";
import useRates from "../../compossables/rate/useRates";
import type { Rate } from "../../models/Rate";

const { rates } = useRates();
const { deleteRateMutations, saveRateMutations, updateRateMutations } =
  useRateMutations();
const isFormLoading = computed(
  () => saveRateMutations.isPending.value || updateRateMutations.isPending.value
);
const { width } = useWindowSize();
const formButtonText = ref("Añadir tarifa");
const showFormModal = ref(false);
const rate = ref<Rate>({
  operation: "0",
  type: "0",
} as Rate);

const onDelete = (rateToDelete: Rate) => {
  deleteRateMutations.mutate(rateToDelete.id);
};
const resetForm = () => {
  rate.value = {
    operation: "0",
    type: "0",
  } as Rate;
  formButtonText.value = "Añadir tarifa";
  showFormModal.value = false;
};

const onRateSave = (rateToSave: Rate) => {
  if (rateToSave.id) {
    updateRateMutations.mutate(rateToSave);
  } else {
    saveRateMutations.mutate(rateToSave);
  }
};

const onCreateNew = () => {
  resetForm();
  if (width.value < 768) {
    showFormModal.value = true;
  }
};

const onRateSelected = (selectedRate: Rate) => {
  rate.value = selectedRate;
  formButtonText.value = "Actualizar Tarifa";
  if (width.value < 768) {
    showFormModal.value = true;
  }
};

watch(deleteRateMutations.isError, () => {
  if (deleteRateMutations.isError.value) {
    let x = deleteRateMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(deleteRateMutations.isSuccess, () => {
  if (deleteRateMutations.isSuccess.value) {
    rates.value = rates.value.filter(
      (x) => x.id != deleteRateMutations.variables.value
    );
    resetForm();
  }
});

watch(saveRateMutations.isError, () => {
  if (saveRateMutations.isError.value) {
    let x = saveRateMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveRateMutations.isSuccess, () => {
  if (saveRateMutations.isSuccess.value) {
    let response = saveRateMutations.data.value;
    if (response) {
      rates.value = [response, ...rates.value];
    }
    resetForm();
  }
});

watch(updateRateMutations.isError, () => {
  if (updateRateMutations.isError.value) {
    let x = updateRateMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateRateMutations.isSuccess, () => {
  if (updateRateMutations.isSuccess.value) {
    let response = updateRateMutations.data.value;
    if (response) {
      for (let index = 0; index < rates.value.length; index++) {
        if (rates.value[index].id == response.id) {
          rates.value[index] = response;
        }
      }
    }
    resetForm();
  }
});
</script>

<template>
  <FormListContainer>
    <template #form>
      <ViewScaffold :title="rate.id ? 'Actualizar Tarifa' : 'Crear Tarifa'">
        <template #default>
          <div class="tw-mb-3"></div>
          <createRateForm
            :rate="rate"
            :is-loading="isFormLoading"
            :form-button-text="formButtonText"
            @rate-submit="onRateSave"
          />
        </template>
      </ViewScaffold>
    </template>
    <template #default>
      <ViewScaffold title="Tarifas">
        <template #default>
          <div>
            <div class="tw-flex tw-justify-between tw-mb-2 tw-items-center">
              <div class="tw-font-semibold tw-text-gray-400">
                <p>Todas las tarifas</p>
              </div>
              <div class="">
                <VBtn
                  color="success"
                  prepend-icon="mdi-plus"
                  @click="onCreateNew"
                >
                  nuevo
                </VBtn>
              </div>
            </div>
            <RatesTableList
              :is-delete-loading="deleteRateMutations.isPending.value"
              :is-update-loading="updateRateMutations.isPending.value"
              :rate="rate"
              @update-rate="onRateSelected"
              @delete-rate="onDelete"
            />
            <VDialog max-width="400" v-model="showFormModal">
              <ViewScaffold
                :title="rate.id ? 'Actualizar Tarifa' : 'Crear Tarifa'"
              >
                <template #default>
                  <div class="tw-mb-3"></div>
                  <createRateForm
                    :rate="rate"
                    :is-loading="isFormLoading"
                    :form-button-text="formButtonText"
                    @rate-submit="onRateSave"
                  />
                </template>
              </ViewScaffold>
            </VDialog>
          </div>
        </template>
      </ViewScaffold>
    </template>
  </FormListContainer>
</template>

<style scoped></style>
