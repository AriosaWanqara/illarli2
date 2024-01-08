<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useCategoryRules from "../../composables/category/useCategoryRules";
import type { Category } from "../../models/Category";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

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

const handleLoad = async (event: any) => {
  if (event.length > 0) {
    const file = event[0].file;
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
      console.log(base64data);
      props.category.image = base64data as string;
    };
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
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drag & Drop una Imagen o da click"
        accepted-file-types="image/jpeg, image/png"
        v-on:updatefiles="handleLoad"
      />
    </VCol> -->
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-w-full tw-justify-end tw-mt-2">
        <VBtn
          color="info"
          @click="onCategorySubmit"
          :loading="props.isLoading"
          :prepend-icon="
            props.category.id ? 'mdi-content-save-outline' : 'mdi-plus'
          "
          variant="elevated"
          density="default"
        >
          {{ buttonText }}
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
