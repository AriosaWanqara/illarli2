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
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

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
  codeError: string[];
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
  props.product.brand_id = params;
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
      props.product.categoriesId.push(response);
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
      props.product.brand_id = response;
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
      <VCol class="py-1" cols="12">
        <InputSection label-message="Codigo" required>
          <VTextField
            hide-details
            variant="solo-filled"
            flat
            :error-messages="props.codeError"
            placeholder="Ingrese el codigo del producto"
            v-model="props.product.sku"
          />
        </InputSection>
      </VCol>
      <VCol class="py-1" cols="12">
        <InputSection label-message="Observaciones">
          <VTextarea
            variant="solo-filled"
            flat
            hide-details
            placeholder="Ingrese una observación del producto."
            v-model="props.product.description"
          />
        </InputSection>
      </VCol>
      <VCol class="py-1" cols="6">
        <InputSection label-message="sección / categoria">
          <SimpleAutoCompleteCreator
            placeholder="Seleccione una categoria"
            color="primary"
            variant="solo-filled"
            :is-flat="true"
            hide-details
            :is-multiple="true"
            :items="categories"
            item-title="name"
            item-value="id"
            :return-object="true"
            :value="props.product.categoriesId"
            :is-loading="isCategoryAutocompleteLoading"
            @model-update="onCategoryAutocompleteModelUpdate"
            @not-exist-item-create="onCategoryCreate"
          />
        </InputSection>
      </VCol>
      <VCol class="py-1" cols="6">
        <InputSection label-message="marca">
          <SimpleAutoCompleteCreator
            placeholder="Seleccione una marca"
            color="primary"
            variant="solo-filled"
            :is-flat="true"
            :is-multiple="false"
            hide-details
            :items="brands"
            item-title="name"
            item-value="id"
            :return-object="true"
            :value="props.product.brand_id"
            :is-loading="isBrandAutocompleteLoading"
            @model-update="onBrandAutocompleteModelUpdate"
            @not-exist-item-create="onBrandCreate"
          />
        </InputSection>
      </VCol>
    </VRow>
  </FormSeccion>
</template>

<style scoped></style>
