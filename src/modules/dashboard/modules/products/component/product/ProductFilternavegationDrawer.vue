<script setup lang="ts">
import { ref } from "vue";
import { watch } from "vue";
import { computed } from "vue";
import type { FilterOption } from "vue3-easy-data-table";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import useCategories from "../../composables/category/useCategories";
import { Icon } from "@iconify/vue";

interface props {
  close: boolean;
}

const props = defineProps<props>();
const emits = defineEmits(["close", "return-filters"]);
const selectedCategories = ref([]);
const { categories, isCategoriesLoading, categoriesHasError } = useCategories();

const range = ref<[number, number]>([0, 0]);
const open = ref(["Precios", "Categorias"]);

const visible = computed({
  get: () => props.close,
  set: (val) => emits("close", val),
});

const filterOptions = computed((): FilterOption[] => {
  const filterOptionsArray: FilterOption[] = [];
  if (range.value.some((x) => x > 0)) {
    filterOptionsArray.push({
      field: "price",
      comparison: "between",
      criteria: range.value,
    });
  }
  if (selectedCategories.value.length > 0) {
    filterOptionsArray.push({
      field: "categories",
      comparison: "in",
      criteria: selectedCategories.value,
    });
  }
  return filterOptionsArray;
});

watch(
  filterOptions,
  () => {
    emits("return-filters", filterOptions.value);
  },
  { deep: true }
);

const clearPriceFilter = () => {
  range.value = [0, 0];
};

const clearCategoryFilter = () => {
  selectedCategories.value = [];
};

const clearFilters = () => {
  clearCategoryFilter();
  clearPriceFilter();
};
</script>

<template>
  <Teleport to="body">
    <VNavigationDrawer v-model="visible" width="320" temporary location="right">
      <div class="tw-px-4 tw-py-4 tw-flex tw-flex-col tw-h-full">
        <header class="tw-flex tw-flex-col tw-pt-4 tw-gap-4">
          <div class="tw-flex tw-justify-between tw-items-center">
            <h1 class="tw-font-semibold">Filtros</h1>
            <VBtn
              icon="mdi-close"
              variant="text"
              density="compact"
              @click="visible = false"
            ></VBtn>
          </div>
          <div class="tw-flex tw-flex-wrap tw-gap-2" v-auto-animate>
            <VBtn
              color="borderColor"
              variant="outlined"
              @click="clearPriceFilter"
              v-if="range.some((x) => x > 0)"
            >
              <p class="textPrimary">${{ range[0] }}-${{ range[1] }}</p>
              <template #append>
                <Icon icon="ion:close" class="tw-text-red-400" height="14" />
              </template>
            </VBtn>
            <VBtn
              color="borderColor"
              variant="outlined"
              v-if="selectedCategories.length > 0"
              @click="clearCategoryFilter"
            >
              <p class="textPrimary">LIMPIAR CATEGORIAS</p>
              <template #append>
                <Icon icon="ion:close" class="tw-text-red-400" height="14" />
              </template>
            </VBtn>
            <VBtn
              color="error"
              variant="tonal"
              v-if="filterOptions.length > 0"
              @click="clearFilters"
            >
              BORRAR TODOS
              <template #append>
                <Icon icon="ion:close" class="tw-text-red-400" height="14" />
              </template>
            </VBtn>
          </div>
        </header>
        <PerfectScrollbar class="tw-flex-1 tw-px-3">
          <VList v-model:opened="open" class="filter-list">
            <VListGroup value="Precios">
              <template #activator="{ props }">
                <VListItem v-bind="props" :ripple="false" color="borderColor">
                  <template #title>
                    <h2 class="title-1 tw-font-semibold textPrimary">Precio</h2>
                  </template>
                </VListItem>
              </template>
              <v-range-slider
                v-model="range"
                :max="500"
                density="compact"
                thumb-size="15"
                thumb-color="error"
                track-color="borderColor"
                color="primary"
                track-size="1"
                :min="0"
                :step="1"
                strict
                hide-details
                class="tw-px-3 custome"
              />
              <div class="tw-flex tw-items-center tw-gap-3 tw-mb-5 tw-mt-2">
                <VTextField
                  v-model="range[0]"
                  hide-details
                  class="tw-min-w-[100px]"
                  prefix="$"
                  type="number"
                  min="0"
                  max="500"
                />
                <VDivider />
                <VTextField
                  v-model="range[1]"
                  hide-details
                  class="tw-min-w-[100px]"
                  prefix="$"
                  type="number"
                  min="0"
                  max="500"
                />
              </div>
            </VListGroup>
            <VListGroup value="Categorias">
              <template #activator="{ props }">
                <VListItem v-bind="props" :ripple="false" color="borderColor">
                  <template #title>
                    <h2 class="title-1 tw-font-semibold textPrimary">
                      Categorias
                    </h2>
                  </template>
                </VListItem>
              </template>
              <v-data-table
                v-model="selectedCategories"
                :items="categories"
                height="150"
                density="compact"
                :loading="isCategoriesLoading"
                :headers="[{ title: '', key: 'quantiy', value: 'name' }]"
                item-value="id"
                :no-data-text="
                  categoriesHasError
                    ? 'Error del servidor 🥲'
                    : 'No hay categorias'
                "
                show-select
              >
                <template #bottom></template>
                <template #headers></template>
              </v-data-table>
            </VListGroup>
          </VList>
        </PerfectScrollbar>
      </div>
    </VNavigationDrawer>
  </Teleport>
</template>

<style scoped>
.overflow-x-hidden {
  overflow-x: hidden !important;
}
</style>
