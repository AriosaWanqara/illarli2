<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCategoryMutations from "@dashboard/modules/products/composables/category/useCategoryMutations";
import type { Category } from "@dashboard/modules/products/models/Category";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CreateCategoryForm from "../../component/category/createCategoryForm.vue";

const { saveCategoryMutation } = useCategoryMutations();
const router = useRouter();

const category = ref<Category>({} as Category);

const onCategorySubmit = (categoryToSave: Category) => {
  saveCategoryMutation.mutate(categoryToSave);
};

watch(saveCategoryMutation.isError, () => {
  if (saveCategoryMutation.isError.value) {
    console.log(saveCategoryMutation.error.value);
    alert("bad");
  }
});

watch(saveCategoryMutation.isSuccess, () => {
  if (saveCategoryMutation.isSuccess.value) {
    router.push({ name: "product-category-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear categoria">
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
      <CreateCategoryForm
        :category="category"
        :isLoading="saveCategoryMutation.isPending.value"
        @category-submit="onCategorySubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
