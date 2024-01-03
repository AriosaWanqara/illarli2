<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCategoryMutations from "@dashboard/modules/products/composables/category/useCategoryMutations";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateCategoryForm from "../../component/category/createCategoryForm.vue";
import useCategory from "../../composables/category/useCategory";
import type { Category } from "../../models/Category";

const { updateCategoryMutation } = useCategoryMutations();
const params = useRoute().params;
const { categoryHasError, isCategoryLoading, category, categoryError } =
  useCategory(params.id.toString());
const router = useRouter();
const error = ref(
  categoryError.value as AxiosError<{ message: string; errors: string[] }>
);

const onCategorySubmit = (categoryToSave: Category) => {
  updateCategoryMutation.mutate(categoryToSave);
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
      <CreateCategoryForm
        v-else
        :category="category"
        :isLoading="updateCategoryMutation.isPending.value"
        @category-submit="onCategorySubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
