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

const { width, height } = useWindowSize();
const { categories } = useCategories();
const { deleteCategoryMutation, updateCategoryMutation, saveCategoryMutation } =
  useCategoryMutations();

const search = ref("");
const category = ref<Category>({} as Category);
const showFormModal = ref(false);
const isCategoryFormLoading = ref(
  computed(
    () =>
      updateCategoryMutation.isPending.value ||
      saveCategoryMutation.isPending.value
  )
);
const buttonText = ref("Añadir categoria");

const onDelete = (categoryToSave: Category) => {
  deleteCategoryMutation.mutate(categoryToSave.id);
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
    category.value = {} as Category;
    showFormModal.value = false;
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
    category.value = {} as Category;
    buttonText.value = "Añadir categoria";
    showFormModal.value = false;
    let response = saveCategoryMutation.data.value;
    if (response) {
      categories.value.filter((x) => x.id == response?.id);
      categories.value = [...categories.value, response];
    }
  }
});

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
    category.value = {} as Category;
    buttonText.value = "Añadir categoria";
    categories.value = categories.value.filter(
      (x) => x.id != deleteCategoryMutation.variables.value
    );
  }
});
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-pt-2 tw-flex-col-reverse md:tw-flex-row">
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
    <ViewScaffold title="Categorias" :is-flat="false" class="tw-flex-1">
      <template #default>
        <div>
          <div
            class="tw-flex tw-mb-5 tw-justify-between tw-items-center tw-px-2"
          >
            <div class="tw-max-w-sm tw-min-w-[200px]">
              <!-- <VTextField
                label="search"
                hide-details
                v-model="search"
                prepend-inner-icon="mdi-magnify"
              /> -->
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
              :title="category.id ? 'Modificando Categoria' : 'Crear Categoria'"
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
        </div>
      </template>
    </ViewScaffold>
  </div>
</template>

<style scoped></style>
