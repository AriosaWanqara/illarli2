<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import CategoriesListTable from "../../component/category/categoriesListTable.vue";
import CreateCategoryForm from "../../component/category/createCategoryForm.vue";
import useCategories from "../../composables/category/useCategories";
import useCategoryMutations from "../../composables/category/useCategoryMutations";
import type { Category } from "../../models/Category";
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";
import { Icon } from "@iconify/vue";

const { width } = useWindowSize();
const { categories } = useCategories();
const { deleteCategoryMutation, updateCategoryMutation, saveCategoryMutation } =
  useCategoryMutations();

const search = ref("");
const category = ref<Category>({} as Category);
const showFormModal = ref(false);
const showConfirmModal = ref(false);
const isCategoryFormLoading = ref(
  computed(
    () =>
      updateCategoryMutation.isPending.value ||
      saveCategoryMutation.isPending.value
  )
);
const buttonText = ref("Añadir categoria");

const onDelete = (categoryToSave: Category) => {
  category.value = { ...categoryToSave };
  showConfirmModal.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    deleteCategoryMutation.mutate(category.value.id);
  }
  showConfirmModal.value = false;
  resetForm();
};

const onNewCategory = () => {
  category.value = {} as Category;
  buttonText.value = "Añadir categoria";
};

const onCategoriSave = (categoryToSave: Category) => {
  if (categoryToSave.id) {
    updateCategoryMutation.mutate(categoryToSave);
  } else {
    saveCategoryMutation.mutate(categoryToSave);
  }
};

const onSelectedCategory = (selectedCategory: Category) => {
  buttonText.value = "Actualizar categoria";
  category.value = { ...selectedCategory };
  if (width.value < 768) {
    showFormModal.value = true;
  }
};

watch(saveCategoryMutation.isError, () => {
  if (saveCategoryMutation.isError.value) {
    let x = saveCategoryMutation.error.value as AxiosError<{ message: string }>;
    alert(x.response?.data.message);
  }
});

watch(saveCategoryMutation.isSuccess, () => {
  if (saveCategoryMutation.isSuccess.value) {
    resetForm();
    let response = saveCategoryMutation.data.value;
    if (response) {
      categories.value = [response, ...categories.value];
    }
  }
});

watch(updateCategoryMutation.isError, () => {
  if (updateCategoryMutation.isError.value) {
    let error = deleteCategoryMutation.error.value as AxiosError<{
      message: string;
    }>;
    alert(JSON.stringify(error.response?.data));
  }
});

watch(updateCategoryMutation.isSuccess, () => {
  if (updateCategoryMutation.isSuccess.value) {
    resetForm();
    let response = updateCategoryMutation.data.value;
    if (response) {
      categories.value.filter((x) => x.id == response?.id);
      categories.value = [...categories.value, response];
    }
  }
});
function resetForm() {
  category.value = {} as Category;
  buttonText.value = "Añadir categoria";
  showFormModal.value = false;
}

watch(deleteCategoryMutation.isError, () => {
  if (deleteCategoryMutation.isError.value) {
    let error = deleteCategoryMutation.error.value as AxiosError<{
      message: string;
    }>;
    alert(JSON.stringify(error.response?.data.message));
  }
});

watch(deleteCategoryMutation.isSuccess, () => {
  if (deleteCategoryMutation.isSuccess.value) {
    resetForm();
    categories.value = categories.value.filter(
      (x) => x.id != deleteCategoryMutation.variables.value
    );
  }
});
</script>

<template>
  <FormListContainer>
    <template #form>
      <ViewScaffold
        :title="category.id ? 'Modificando Categoria' : 'Crear Categoria'"
        :is-flat="false"
        class="tw-max-w-[400px] tw-hidden md:tw-block"
      >
        <template #default>
          <div class="tw-mb-3"></div>
          <CreateCategoryForm
            :category="category"
            :is-loading="isCategoryFormLoading"
            :button-text="buttonText"
            @category-submit="onCategoriSave"
          />
        </template>
      </ViewScaffold>
    </template>
    <template #default>
      <ViewScaffold title="Categorias" :is-flat="false" class="tw-flex-1">
        <template #action>
          <div class="tw-w-[200px]">
            <VTextField label="Buscar categoria" v-model="search" hide-details>
              <template #append-inner>
                <Icon icon="mingcute:search-3-line" height="18" />
              </template>
            </VTextField>
          </div>
        </template>
        <template #default>
          <div>
            <div
              class="tw-flex tw-mb-5 tw-justify-between tw-items-center tw-px-2"
            >
              <div class="tw-max-w-sm tw-min-w-[200px]">
                <p class="tw-font-semibold">Todas las categorias</p>
              </div>
              <div class="tw-hidden md:tw-block">
                <VBtn
                  color="success"
                  prepend-icon="mdi-plus"
                  @click="onNewCategory"
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
            <CategoriesListTable
              :category="category"
              :is-delete-loading="deleteCategoryMutation.isPending.value"
              :is-modify-loading="false"
              :search="search"
              @update-handle="onSelectedCategory"
              @delete-handle="onDelete"
            />
            <VDialog v-model="showFormModal" max-width="400">
              <ViewScaffold
                :title="
                  category.id ? 'Modificando Categoria' : 'Crear Categoria'
                "
                :is-flat="false"
              >
                <template #default>
                  <div class="tw-mb-3"></div>
                  <CreateCategoryForm
                    :category="category"
                    :is-loading="isCategoryFormLoading"
                    :button-text="buttonText"
                    @category-submit="onCategoriSave"
                  />
                </template>
              </ViewScaffold>
            </VDialog>
            <ConfirmDeleteDialog
              :dialog-text="'Esta seguro que desa borrar la categoria?'"
              :show-modal="showConfirmModal"
              :title="'¿Estás seguro de Eliminar este Item?'"
              @confirm-response="onConfirmReponse"
            />
          </div>
        </template>
      </ViewScaffold>
    </template>
  </FormListContainer>
</template>

<style scoped></style>
