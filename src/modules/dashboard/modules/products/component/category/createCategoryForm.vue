<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useCategoryRules from "../../composables/category/useCategoryRules";
import type { Category } from "../../models/Category";

interface props {
  isLoading: boolean;
  category: Category;
  buttonText: string;
}

const props = defineProps<props>();

const emit = defineEmits(["category-submit"]);
const { categoryRules } = useCategoryRules();

const onCategorySubmit = () => {
  const categoryValidator = useVuelidate(categoryRules, props.category);
  categoryValidator.value.$reset();
  categoryValidator.value.$validate();
  console.log(props.category);
  if (!categoryValidator.value.$error) {
    emit("category-submit", props.category);
  } else {
    alert(
      JSON.stringify(categoryValidator.value.$errors.map((x) => x.$message))
    );
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label class="tw-font-semibold tw-text-gray-400 tw-uppercase"
          >Nombre de la categoria <span class="tw-text-red-300">*</span>
        </label>
        <VTextField
          placeholder="nombre"
          v-model="props.category.name"
          variant="solo-filled"
        />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1 tw-text-gray-400">
        <label class="tw-font-semibold tw-uppercase"
          >Descripcion de la categoria</label
        >
        <VTextarea
          rows="4"
          flat
          variant="solo-filled"
          density="compact"
          placeholder="descripcion"
          v-model="props.category.description"
        />
      </div>
    </VCol>
    <!-- <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1 tw-text-gray-400">
        <label class="tw-font-semibold">Descripcion de la categoria</label>
        <VFileInput prepend-icon="" label="foto" variant="solo-filled" flat>
        </VFileInput>
      </div>
    </VCol> -->
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-w-full tw-justify-end">
        <VBtn
          color="info"
          @click="onCategorySubmit"
          :loading="props.isLoading"
          prepend-icon="mdi-plus"
          variant="elevated"
          density="default"
        >
          <p class="tw-font-semibold">{{ buttonText }}</p>
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
