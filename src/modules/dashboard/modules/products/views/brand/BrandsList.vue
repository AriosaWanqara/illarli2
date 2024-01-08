<script setup lang="ts">
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useWindowSize } from "@vueuse/core";
import type { AxiosError } from "axios";
import { computed, ref, watch } from "vue";
import BrandsListTable from "../../component/brand/brandsListTable.vue";
import CreateBrandForm from "../../component/brand/createBrandForm.vue";
import useBrands from "../../composables/brand/useBrands";
import useBrandsMutations from "../../composables/brand/useBrandsMutations";
import type { Brand } from "../../models/Brand";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";

const { deleteBrandMutation, saveBrandMutation, updateBrandMutation } =
  useBrandsMutations();
const { brands } = useBrands();
const { width } = useWindowSize();

const brand = ref<Brand>({} as Brand);
const buttonText = ref("Añadir marca");
const showFormModal = ref(false);
const showConfirmModal = ref(false);
const isCategoryFormLoading = ref(
  computed(
    () =>
      updateBrandMutation.isPending.value || saveBrandMutation.isPending.value
  )
);

const onDelete = (brandToDelete: Brand) => {
  brand.value = brandToDelete;
  showConfirmModal.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    deleteBrandMutation.mutate(brand.value.id);
  }
  showConfirmModal.value = false;
  resetFormState();
};

const onBrandSelected = (selectedBrand: Brand) => {
  buttonText.value = "Actualizar marca";
  brand.value = selectedBrand;
  if (width.value < 768) {
    showFormModal.value = true;
  }
};

const onBrandSubmit = (brandToSave: Brand) => {
  if (brandToSave.id) {
    updateBrandMutation.mutate(brandToSave);
  } else {
    saveBrandMutation.mutate(brandToSave);
  }
};

function resetFormState() {
  brand.value = {} as Brand;
  buttonText.value = "Añadir Marca";
  showFormModal.value = false;
}

watch(deleteBrandMutation.isError, () => {
  if (deleteBrandMutation.isError.value) {
    let x = deleteBrandMutation.error.value as AxiosError<{
      message: string;
      errors: string[];
    }>;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(deleteBrandMutation.isSuccess, () => {
  if (deleteBrandMutation.isSuccess.value) {
    resetFormState();
    brands.value = brands.value.filter(
      (x) => x.id != deleteBrandMutation.variables.value
    );
  }
});

watch(saveBrandMutation.isError, () => {
  if (saveBrandMutation.isError.value) {
    let x = saveBrandMutation.error.value as AxiosError<{
      message: string;
      errors: string[];
    }>;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(saveBrandMutation.isSuccess, () => {
  if (saveBrandMutation.isSuccess.value) {
    resetFormState();
    if (saveBrandMutation.data.value) {
      brands.value = [saveBrandMutation.data.value, ...brands.value];
    }
  }
});

watch(updateBrandMutation.isError, () => {
  if (updateBrandMutation.isError.value) {
    let x = updateBrandMutation.error.value as AxiosError<{
      message: string;
      errors: string[];
    }>;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(updateBrandMutation.isSuccess, () => {
  if (updateBrandMutation.isSuccess.value) {
    resetFormState();
    let response = updateBrandMutation.data.value;
    if (response) {
      for (let index = 0; index < brands.value.length; index++) {
        if (brands.value[index].id == response.id) {
          brands.value[index] = response;
        }
      }
    }
  }
});
</script>

<template>
  <FormListContainer>
    <template #form>
      <ViewScaffold :title="brand.id ? 'Actualizar marca' : 'Crear marcas'">
        <template #default>
          <div class="tw-mb-3"></div>
          <CreateBrandForm
            :brand="brand"
            :button-text="buttonText"
            :isLoading="isCategoryFormLoading"
            @submit-brand="onBrandSubmit"
          />
        </template>
      </ViewScaffold>
    </template>
    <template #default>
      <ViewScaffold title="Marcas" class="tw-flex-1">
        <template #default>
          <div>
            <div
              class="tw-flex tw-mb-5 tw-justify-between tw-items-center tw-px-2"
            >
              <div class="tw-max-w-sm tw-min-w-[200px]">
                <p class="tw-font-semibold">Todas las Marcas</p>
              </div>
              <div class="tw-hidden md:tw-block">
                <VBtn
                  color="success"
                  prepend-icon="mdi-plus"
                  @click="resetFormState"
                  >Nuevo</VBtn
                >
              </div>
              <div class="md:tw-hidden">
                <VBtn
                  color="success"
                  prepend-icon="mdi-plus"
                  @click="showFormModal = true"
                  >Nuevo</VBtn
                >
              </div>
            </div>
            <BrandsListTable
              :brand="brand"
              :is-delete-loading="deleteBrandMutation.isPending.value"
              :is-update-loading="false"
              @brand-update="onBrandSelected"
              @brand-delete="onDelete"
            />
          </div>
          <VDialog v-model="showFormModal" max-width="400">
            <ViewScaffold
              :title="brand.id ? 'Actualizar marca' : 'Crear marcas'"
            >
              <template #default>
                <div class="tw-mb-3"></div>
                <CreateBrandForm
                  :brand="brand"
                  :button-text="buttonText"
                  :isLoading="isCategoryFormLoading"
                  @submit-brand="onBrandSubmit"
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
        </template>
      </ViewScaffold>
    </template>
  </FormListContainer>
</template>

<style scoped></style>
