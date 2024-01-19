<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { computed, ref, watch } from "vue";
import ProductTableList from "../../component/product/list/ProductTableList.vue";
import useProductMutations from "../../composables/product/useProductMutations";
import useProducts from "../../composables/product/useProducts";
import type { Product } from "../../models/products/Product";
import { Icon } from "@iconify/vue";
import type { FilterOption } from "vue3-easy-data-table";
import ProductFilternavegationDrawer from "../../component/product/ProductFilternavegationDrawer.vue";

const { products, activeProduct, inactiveProduct, totalProduct } =
  useProducts();
const { deleteProductMutation } = useProductMutations();
const router = useRouter();
const showConfirmModal = ref(false);
const selectedProduct = ref<Product>({} as Product);
// const isTable = ref(true);
const search = ref();
const statusCriteria = ref("all");
const openFilter = ref(false);
const newFilters = ref<any[]>([]);
const selectedItems = ref<Product[]>([]);

const onDeleteProduct = (product: Product) => {
  selectedProduct.value = product;
  showConfirmModal.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    deleteProductMutation.mutate(selectedProduct.value);
  }
  showConfirmModal.value = false;
};

const onSelectProduct = (product: Product) => {
  router.push({ name: "product-update", params: { id: product.id } });
};

watch(deleteProductMutation.isError, () => {
  if (deleteProductMutation.isError.value) {
    let x = deleteProductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(deleteProductMutation.isSuccess, () => {
  if (deleteProductMutation.isSuccess.value) {
    products.value = products.value.filter(
      (x) => x.id != deleteProductMutation.variables.value?.id
    );
  }
});

const filter = ref([
  { label: "Todos los productos", value: "all", number: totalProduct },
  { label: "Disponibles", value: 1, number: activeProduct },
  { label: "Desactivados", value: 0, number: inactiveProduct },
]);

const filterOptions = computed((): FilterOption[] => {
  let filterOptionsArray: FilterOption[] = [];
  if (statusCriteria.value !== "all") {
    filterOptionsArray.push({
      field: "active",
      comparison: "=",
      criteria: statusCriteria.value,
    });
  }
  if (newFilters.value.length > 0) {
    filterOptionsArray = [...filterOptionsArray, ...newFilters.value];
  }
  return filterOptionsArray;
});

const onProductStateSetFilter = (filter: any) => {
  statusCriteria.value = filter;
};

const onFilterReturn = (params: any[]) => {
  newFilters.value = params;
};
</script>
<template>
  <ViewScaffold>
    <template #default>
      <div>
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <div class="tw-w-[24rem]">
            <VTextField
              hide-details
              placeholder="Buscar productos..."
              v-model="search"
            >
              <Icon
                icon="material-symbols:search-rounded"
                height="18"
                class="tw-text-[#036666]"
              />
            </VTextField>
          </div>
          <div class="tw-flex tw-gap-3">
            <VBtn color="borderColor" variant="outlined" flat>
              <template #prepend>
                <Icon
                  icon="humbleicons:dots-vertical"
                  class="tw-text-[#036666]"
                />
              </template>
              <p class="tw-text-[#036666]">Acciones</p>
            </VBtn>
            <VBtn
              color="info"
              variant="elevated"
              flat
              prepend-icon="mdi-download"
            >
              Exportar</VBtn
            >
            <RouterLink :to="{ name: 'product-add' }">
              <v-btn
                flat
                color="success"
                prepend-icon="mdi-plus"
                variant="elevated"
                >Nuevo</v-btn
              >
            </RouterLink>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-2">
          <div class="tw-flex tw-gap-5">
            <p
              class="tw-font-semibold tw-text-gray-400 tw-cursor-pointer"
              :class="statusCriteria == item.value ? 'tw-text-[#036666]' : ''"
              v-for="item in filter"
              @click="onProductStateSetFilter(item.value)"
            >
              {{ item.label }}
              <span
                class="tw-border-[1px] tw-px-3 tw-py-1 tw-rounded-2xl"
                :class="
                  statusCriteria == item.value ? 'tw-border-[#036666]' : ''
                "
                >({{ item.number }})</span
              >
            </p>
          </div>
          <div class="tw-flex tw-gap-5">
            <!-- <VBtn
              variant="outlined"
              color="borderColor"
              class="px-0"
              @click="isTable = false"
            >
              <Icon
                icon="bi:grid"
                :class="!isTable ? 'tw-text-[#036666]' : 'tw-text-black'"
                height="16"
              />
            </VBtn>
            <VBtn
              variant="outlined"
              color="borderColor"
              class="px-0"
              @click="isTable = true"
            >
              <Icon
                icon="material-symbols:format-list-bulleted"
                :class="isTable ? 'tw-text-[#036666]' : 'tw-text-black'"
                height="16"
              />
            </VBtn> -->
            <VBtn
              variant="tonal"
              :color="newFilters.length > 0 ? 'info' : 'primary'"
              class="px-0"
              @click="openFilter = true"
            >
              <Icon
                icon="mdi:filter-off"
                :class="'tw-text-blue-600'"
                height="16"
                v-if="newFilters.length > 0"
              />
              <Icon
                icon="mdi:filter"
                :class="'tw-text-black'"
                height="16"
                v-else
              />
            </VBtn>
          </div>
        </div>
        <ProductTableList
          :is-delete-loading="deleteProductMutation.isPending.value"
          :is-update-loading="false"
          :search="search"
          :filter-options="filterOptions"
          @product-delete="onDeleteProduct"
          @product-update="onSelectProduct"
          @products-filters="(params) => (selectedItems = params)"
        />
        <ConfirmDeleteDialog
          :dialog-text="'Esta seguro que desa borrar el producto?'"
          :show-modal="showConfirmModal"
          :title="'Desea borrar'"
          @confirm-response="onConfirmReponse"
        />
        <ProductFilternavegationDrawer
          :close="openFilter"
          @close="(params) => (openFilter = params)"
          @return-filters="onFilterReturn"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped>
.search-w {
  max-width: 400px;
}
</style>
