<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCategoryMutations from "@dashboard/modules/products/composables/category/useCategoryMutations";
import useCategoryRules from "@dashboard/modules/products/composables/category/useCategoryRules";
import { useVuelidate } from "@vuelidate/core";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useCategory from "../../composables/category/useCategory";
import { ref } from "vue";
import type { AxiosError } from "axios";

const { updateCategoryMutation } = useCategoryMutations();
const { categoryRules } = useCategoryRules();
const params = useRoute().params;
const { categoryHasError, isCategoryLoading, category, categoryError } =
  useCategory(params.id.toString());
const router = useRouter();
const categoryValidator = useVuelidate(categoryRules, category);
const error = ref(
  categoryError.value as AxiosError<{ message: string; errors: string[] }>
);

const onCategorySubmit = () => {
  categoryValidator.value.$validate();
  if (!categoryValidator.value.$error) {
    updateCategoryMutation.mutate(category.value);
  }
};

watch(updateCategoryMutation.isError, () => {
  if (updateCategoryMutation.isError.value) {
    console.log(updateCategoryMutation.error.value);
    alert("bad");
  }
});

watch(updateCategoryMutation.isSuccess, () => {
  if (updateCategoryMutation.isSuccess.value) {
    router.push({ name: "product-category-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Actualizar categoria">
    <template #actionBack>
      <RouterLink :to="{ name: 'product-category-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-2" v-if="isCategoryLoading">
        <VCol cols="12" class="py-1">
          <p>cargando..</p>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-2" v-else-if="categoryHasError">
        <VCol cols="12" class="py-1">
          <p>{{ error }}</p>
        </VCol>
      </VRow>
      <VRow class="mt-2" v-else>
        <VCol cols="12" class="py-1">
          <VTextField label="nombre" v-model="category.name" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VTextField label="descripcion" v-model="category.description" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onCategorySubmit"
            :loading="updateCategoryMutation.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
