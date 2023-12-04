<script setup lang="ts">
import { ref } from "vue";
import useCategoryMutations from "@dashboard/modules/products/composables/category/useCategoryMutations";
import useCategoryRules from "@dashboard/modules/products/composables/category/useCategoryRules";
import type { Category } from "@dashboard/modules/products/models/Category";
import { useVuelidate } from "@vuelidate/core";
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";

const { saveCategoryMutation } = useCategoryMutations();
const { categoryRules } = useCategoryRules();
const router = useRouter();

const category = ref<Category>({} as Category);
const categoryValidator = useVuelidate(categoryRules, category);

const onCategorySubmit = () => {
  categoryValidator.value.$validate();
  if (!categoryValidator.value.$error) {
    saveCategoryMutation.mutate(category.value);
  }
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
      <VRow class="mt-2">
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
            :loading="saveCategoryMutation.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
