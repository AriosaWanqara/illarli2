<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCategories from "../../composables/category/useCategories";
import useCategoryMutations from "../../composables/category/useCategoryMutations";
import { watch } from "vue";
import type { RouterLink } from "vue-router";
import type { AxiosError } from "axios";
import api from "@/api/axios";

const { categories, categoriesHasError, isCategoriesLoading } = useCategories();
const { deleteCategoryMutation } = useCategoryMutations();

watch(deleteCategoryMutation.isError, () => {
  if (deleteCategoryMutation.isError.value) {
    let error = deleteCategoryMutation.error.value as AxiosError<{
      message: string;
      errors: string[];
    }>;
    alert(JSON.stringify(error.response?.data));
  }
});

watch(deleteCategoryMutation.isSuccess, () => {
  if (deleteCategoryMutation.isSuccess.value) {
    categories.value = categories.value.filter(
      (x) => x.id != deleteCategoryMutation.variables.value
    );
  }
});

const onDelete = (id: string) => {
  deleteCategoryMutation.mutate(id);
};

const text = () => {
  api
    .get("https://todoneg.com/api/sri/payment/methods")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <ViewScaffold title="Categorias">
    <template #action>
      <RouterLink :to="{ name: 'product-category-add' }">
        <v-btn color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
      <!-- <v-btn color="success" @click="text"><PlusIcon size="18" class="mr-2" />test</v-btn> -->
    </template>
    <template #default>
      <p v-if="isCategoriesLoading">cargando..</p>
      <p v-else-if="categoriesHasError">error</p>
      <div v-else v-for="category in categories">
        {{ category.name }}
        <RouterLink
          :to="{ name: 'product-category-update', params: { id: category.id } }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(category.id)"
          :loading="deleteCategoryMutation.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
