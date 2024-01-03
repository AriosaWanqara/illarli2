<script setup lang="ts">
import { ref } from "vue";
import type { Category } from "../../models/Category";
import useCategoryRules from "../../composables/category/useCategoryRules";
import useVuelidate from "@vuelidate/core";

interface props {
  isLoading: boolean;
  category: Category;
}

const { category } = defineProps<props>();
const categoryToSave = ref<Category>({ ...category });
const emit = defineEmits(["category-submit"]);
const { categoryRules } = useCategoryRules();
const categoryValidator = useVuelidate(categoryRules, categoryToSave);

const onCategorySubmit = () => {
  categoryValidator.value.$validate();
  if (!categoryValidator.value.$error) {
    emit("category-submit", categoryToSave.value);
  } else {
    alert(
      JSON.stringify(categoryValidator.value.$errors.map((x) => x.$message))
    );
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12" class="tw-mb-1">
      <VDivider />
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold">Nombre de la categoria*</label>
        <VTextField placeholder="nombre" v-model="categoryToSave.name" />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"
          >Descripcion de la categoria</label
        >
        <VTextarea
          rows="2"
          density="compact"
          placeholder="descripcion"
          v-model="categoryToSave.description"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <VBtn color="primary" @click="onCategorySubmit" :loading="isLoading"
        >Crear</VBtn
      >
    </VCol>
  </VRow>
</template>

<style scoped></style>
