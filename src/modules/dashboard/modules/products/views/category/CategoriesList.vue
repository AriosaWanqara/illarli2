<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import type { RouterLink } from "vue-router";
import type { Header } from "vue3-easy-data-table";
import useCategories from "../../composables/category/useCategories";
import useCategoryMutations from "../../composables/category/useCategoryMutations";
import { Icon } from "@iconify/vue";

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

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];
</script>

<template>
  <ViewScaffold title="Categorias">
    <template #action>
      <RouterLink :to="{ name: 'product-category-add' }">
        <v-btn color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isCategoriesLoading">cargando..</p>
      <p v-else-if="categoriesHasError">error</p>
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="categories"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{
                    name: 'product-category-update',
                    params: { id: item.id },
                  }"
                >
                  <v-btn icon flat v-bind="props" variant="text">
                    <Icon icon="mdi:pencil" />
                  </v-btn>
                </RouterLink>
              </template>
            </v-tooltip>
            <v-tooltip text="Delete">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  flat
                  v-bind="props"
                  variant="text"
                  @click="onDelete(item.id)"
                  :loading="deleteCategoryMutation.isPending.value"
                >
                  <Icon icon="mdi:trash-can-outline" />
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </EasyDataTable>
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
