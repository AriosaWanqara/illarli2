<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import type { baseProduct } from "../../../models/products/Product";
import SimpleAutoCompleteCreator from "@/modules/dashboard/components/shared/SimpleAutoCompleteCreator.vue";
import useCategories from "../../../composables/category/useCategories";
import { computed } from "vue";
import useCategoryMutations from "../../../composables/category/useCategoryMutations";
import { watch } from "vue";
import useBrands from "../../../composables/brand/useBrands";
import useBrandsMutations from "../../../composables/brand/useBrandsMutations";

const { categories, isCategoriesLoading } = useCategories();
const { brands, isBrandsLoading } = useBrands();
const { saveBrandMutation } = useBrandsMutations();
const { saveCategoryMutation } = useCategoryMutations();
const isCategoryAutocompleteLoading = computed(
  () => isCategoriesLoading.value || saveCategoryMutation.isPending.value
);
const isBrandAutocompleteLoading = computed(
  () => isBrandsLoading.value || saveBrandMutation.isPending.value
);

interface props {
  product: baseProduct;
}
const props = defineProps<props>();

const onCategoryAutocompleteModelUpdate = (params: any) => {
  if (Array.isArray(params)) {
    props.product.categoriesId = params;
  } else {
    if (!props.product.categoriesId.includes(params.id)) {
      props.product.categoriesId.push(params.id);
    }
  }
};

const onBrandAutocompleteModelUpdate = (params: any) => {
  if (params) {
    if (params.id) {
      props.product.brand_id = params.id;
    } else {
      props.product.brand_id = params;
    }
  } else {
    props.product.brand_id = params;
  }
};

const onCategoryCreate = (name: string) => {
  let category = {
    name: name,
  };
  saveCategoryMutation.mutate(category);
};

const onBrandCreate = (name: string) => {
  let category = {
    name: name,
  };
  saveBrandMutation.mutate(category);
};

watch(saveCategoryMutation.isSuccess, () => {
  if (saveCategoryMutation.isSuccess.value) {
    let response = saveCategoryMutation.data.value;
    if (response) {
      props.product.categoriesId.push(response.id);
      categories.value = [response, ...categories.value];
    }
  }
});

watch(saveCategoryMutation.isError, () => {
  if (saveCategoryMutation.isError.value) {
  }
});
watch(saveBrandMutation.isSuccess, () => {
  if (saveBrandMutation.isSuccess.value) {
    let response = saveBrandMutation.data.value;
    if (response) {
      props.product.brand_id = response.id;
      brands.value = [response, ...brands.value];
    }
  }
});

watch(saveBrandMutation.isError, () => {
  if (saveBrandMutation.isError.value) {
  }
});
</script>

<template>
  <FormSeccion title="Información General">
    <VRow class="py-0">
      <VCol class="py-0" cols="12">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-uppercase tw-font-semibold tw-text-gray-400"
            >Codigo <span class="tw-text-red-300">*</span></label
          >
          <VTextField
            variant="solo-filled"
            flat
            placeholder="Ingrese el codigo del producto"
            v-model="props.product.sku"
          />
        </div>
      </VCol>
      <VCol class="py-0" cols="12">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-uppercase tw-font-semibold tw-text-gray-400"
            >Observaciones</label
          >
          <VTextarea
            variant="solo-filled"
            flat
            placeholder="Ingrese una observación del producto."
            v-model="props.product.description"
          />
        </div>
      </VCol>
      <VCol class="py-0" cols="6">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-uppercase tw-font-semibold tw-text-gray-400"
            >sección / categoria
          </label>
          <SimpleAutoCompleteCreator
            placeholder="Seleccione una categoria"
            color="primary"
            variant="solo-filled"
            :is-flat="true"
            :is-multiple="true"
            :items="categories"
            item-title="name"
            item-value="id"
            :value="props.product.categoriesId"
            :is-loading="isCategoryAutocompleteLoading"
            @model-update="onCategoryAutocompleteModelUpdate"
            @not-exist-item-create="onCategoryCreate"
          />
        </div>
      </VCol>
      <VCol class="py-0" cols="6">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label for="" class="tw-uppercase tw-font-semibold tw-text-gray-400"
            >marca
          </label>
          <SimpleAutoCompleteCreator
            placeholder="Seleccione una marca"
            color="primary"
            variant="solo-filled"
            :is-flat="true"
            :is-multiple="false"
            :items="brands"
            item-title="name"
            item-value="id"
            :value="props.product.brand_id"
            :is-loading="isBrandAutocompleteLoading"
            @model-update="onBrandAutocompleteModelUpdate"
            @not-exist-item-create="onBrandCreate"
          />
        </div>
      </VCol>
    </VRow>
  </FormSeccion>
</template>

<style scoped></style>
