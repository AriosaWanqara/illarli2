<script setup lang="ts">
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useWindowSize } from "@vueuse/core";
import type { AxiosError } from "axios";
import { computed, ref, watch } from "vue";
import CashdrawersTableList from "../../component/cashdrawer/cashdrawersTableList.vue";
import CreateCashDrawerForm from "../../component/cashdrawer/createCashDrawerForm.vue";
import useCashdrawers from "../../composables/cashdrawer/useCashdrawers";
import useCashdrawersMutations from "../../composables/cashdrawer/useCashdrawersMutations";
import type { Cashdrawer } from "../../models/Cashdrawer";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";

const { width } = useWindowSize();
const { cashdrawers } = useCashdrawers();
const {
  deleteCashdrawerMutations,
  saveCashdrawerMutations,
  updateCashdrawerMutations,
} = useCashdrawersMutations();

const cashdrawer = ref<Cashdrawer>({} as Cashdrawer);
const isFormLoading = computed(
  () =>
    saveCashdrawerMutations.isPending.value ||
    updateCashdrawerMutations.isPending.value
);
const formButtonText = ref("Añadir Caja");
const showFormModal = ref(false);
const showConfirmModal = ref(false);

const onDelete = (cashdrawerToDelete: Cashdrawer) => {
  cashdrawer.value = cashdrawerToDelete;
  showConfirmModal.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    deleteCashdrawerMutations.mutate(cashdrawer.value.id);
  }
  showConfirmModal.value = false;
  resetForm();
};

const onCashDrawerSubmit = (cashdrawerToSave: Cashdrawer) => {
  if (cashdrawerToSave.id) {
    updateCashdrawerMutations.mutate(cashdrawerToSave);
  } else {
    saveCashdrawerMutations.mutate(cashdrawerToSave);
  }
};

const onNewCashdrawer = () => {
  resetForm();
  if (width.value < 768) {
    showFormModal.value = true;
  }
};

const onCashDrawerSelect = (cashdrawerSelected: Cashdrawer) => {
  cashdrawer.value = cashdrawerSelected;
  formButtonText.value = "Actualizar Caja";
  if (width.value < 768) {
    showFormModal.value = true;
  }
};

const resetForm = () => {
  cashdrawer.value = {} as Cashdrawer;
  formButtonText.value = "Añadir Caja";
  showFormModal.value = false;
};

watch(deleteCashdrawerMutations.isError, () => {
  if (deleteCashdrawerMutations.isError.value) {
    alert("bad");
  }
});

watch(deleteCashdrawerMutations.isSuccess, () => {
  if (deleteCashdrawerMutations.isSuccess.value) {
    cashdrawers.value = cashdrawers.value.filter(
      (x) => x.id != deleteCashdrawerMutations.variables.value
    );
    resetForm();
  }
});

watch(saveCashdrawerMutations.isError, () => {
  if (saveCashdrawerMutations.isError.value) {
    let x = saveCashdrawerMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveCashdrawerMutations.isSuccess, () => {
  if (saveCashdrawerMutations.isSuccess.value) {
    let response = saveCashdrawerMutations.data.value;
    if (response) {
      cashdrawers.value = [response, ...cashdrawers.value];
    }
    resetForm();
  }
});

watch(updateCashdrawerMutations.isError, () => {
  if (updateCashdrawerMutations.isError.value) {
    let x = updateCashdrawerMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateCashdrawerMutations.isSuccess, () => {
  if (updateCashdrawerMutations.isSuccess.value) {
    let response = updateCashdrawerMutations.data.value;
    if (response) {
      for (let index = 0; index < cashdrawers.value.length; index++) {
        if (cashdrawers.value[index].id == response.id) {
          cashdrawers.value[index] = response;
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
      <ViewScaffold :title="cashdrawer.id ? 'Actualizar Caja' : 'Crear Caja'">
        <div class="tw-mb-3"></div>
        <CreateCashDrawerForm
          :form-button-text="formButtonText"
          :is-loading="isFormLoading"
          :cashdrawer="cashdrawer"
          @submit-cashdrawer="onCashDrawerSubmit"
        />
      </ViewScaffold>
    </template>
    <template #default>
      <ViewScaffold title="Cajas">
        <template #default>
          <div>
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-3">
              <div class="">
                <p class="tw-font-semibold tw-text-gray-400">Todas las cajas</p>
              </div>
              <div class="">
                <VBtn
                  color="success"
                  prepend-icon="mdi-plus"
                  @click="onNewCashdrawer"
                >
                  nuevo
                </VBtn>
              </div>
            </div>
            <CashdrawersTableList
              :cashdrawer="cashdrawer"
              :is-delete-loading="deleteCashdrawerMutations.isPending.value"
              :is-update-loading="updateCashdrawerMutations.isPending.value"
              @delete-cashdrawer="onDelete"
              @update-cashdrawer="onCashDrawerSelect"
            />
          </div>
        </template>
      </ViewScaffold>
      <VDialog max-width="400" v-model="showFormModal">
        <ViewScaffold :title="cashdrawer.id ? 'Actualizar Caja' : 'Crear Caja'">
          <div class="tw-mb-3"></div>
          <CreateCashDrawerForm
            :form-button-text="formButtonText"
            :is-loading="isFormLoading"
            :cashdrawer="cashdrawer"
            @submit-cashdrawer="onCashDrawerSubmit"
          />
        </ViewScaffold>
      </VDialog>
      <ConfirmDeleteDialog
        :dialog-text="'Esta seguro que desa borrar la caja?'"
        :show-modal="showConfirmModal"
        :title="'Desea borrar'"
        @confirm-response="onConfirmReponse"
      />
    </template>
  </FormListContainer>
</template>

<style scoped></style>
