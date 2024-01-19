<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import imageNotFound from "@/assets/Image-not-found.png";
import { Icon } from "@iconify/vue";
import type { FilterOption, Header } from "vue3-easy-data-table";
import useProducts from "../../../composables/product/useProducts";
import type { Product } from "../../../models/products/Product";
import Status from "@/modules/dashboard/components/shared/Status.vue";
import { statusEnum } from "@/const/statusEnum";
import { ref } from "vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  product?: Product;
  filterOptions?: FilterOption[];
}

const props = defineProps<props>();
const emits = defineEmits([
  "product-update",
  "product-delete",
  "products-selected",
  "products-filters",
]);

const { isProductsLoading, products, productsHasError } = useProducts();
const itemsSelected = ref([]);

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Precio", value: "price" },
  { text: "Estado", value: "active" },
  { text: "Tipo", value: "product_type_name" },
  { text: "Acciones", value: "actions", width: 110 },
];

const onDeleteProduct = (product: Product) => {
  emits("product-delete", product);
};
const onSelectProduct = (product: Product) => {
  emits("product-update", product);
};

const onItemSelected = (params: any) => {
  itemsSelected.value = params;
};
const onItemFilter = (params: any) => {
  emits("products-filters", params);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isProductsLoading"
    :item="product"
    :search="props.search"
    :items="products"
    :is-error="productsHasError"
    :items-selected="itemsSelected"
    :filter-options="props.filterOptions"
    @item-selected-update="onItemSelected"
    @filter-update="onItemFilter"
  >
    <template #name="{ item }">
      <div class="tw-flex tw-gap-2 tw-items-center">
        <div class="tw-rounded-md tw-overflow-hidden">
          <VImg
            :src="item.image ? item.image : imageNotFound"
            height="40"
            width="40"
            aspect-ratio="2/2"
          />
        </div>
        <div class="tw-flex tw-flex-col">
          <p class="tw-leading-5">{{ item.name }}</p>
          <p class="tw-leading-5 tw-text-sm tw-text-gray-400">
            Codigo:{{ item.sku }}
          </p>
        </div>
      </div>
    </template>
    <template #price="{ item }">
      <p class="tw-font-semibold">$ {{ parseFloat(item.price).toFixed(2) }}</p>
    </template>
    <template #active="{ item }">
      <Status
        v-if="item.active"
        :type="statusEnum.SUCCESS"
        :message="'Disponible'"
      />
      <Status v-else :type="statusEnum.ERROR" :message="'Desactivado'" />
    </template>
    <template #actions="{ item }">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            variant="text"
            color="black"
            @click="onSelectProduct(item)"
            :loading="isUpdateLoading"
          >
            <Icon icon="lucide:pencil" />
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Delete">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            color="error"
            variant="text"
            @click="onDeleteProduct(item)"
            :loading="isDeleteLoading"
          >
            <Icon icon="mdi:trash-can-outline" />
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </BaseTableComponent>
</template>

<style scoped></style>
