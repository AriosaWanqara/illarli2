<script setup lang="ts">
import { getPrimaryColor } from "@/utils/getColors";
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useProducts from "../../../composables/product/useProducts";
import type { Product } from "../../../models/products/Product";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { computed } from "vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  product?: Product;
}

const props = defineProps<props>();
const emits = defineEmits(["product-update", "product-delete"]);

const { isProductsLoading, products } = useProducts();

const dataTable = ref();
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const page = ref(1);

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.product) {
    if (props.product.id) {
      if (props.product.id == item.id) {
        return "selected-row";
      }
    }
  }
  return "";
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Precio", value: "price" },
  { text: "stock", value: "stock" },
  { text: "Tipo", value: "product_type_name" },
  { text: "", value: "actions", width: 110 },
];

const onDeleteProduct = (product: Product) => {
  emits("product-delete", product);
};
const onSelectProduct = (product: Product) => {
  emits("product-update", product);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :theme-color="getPrimaryColor()"
    :items="products"
    :loading="isProductsLoading"
    alternating
    ref="dataTable"
    :body-row-class-name="bodyRowClassNameFunction"
    :search-field="['name', 'description']"
    :search-value="props.search"
    :rows-per-page="10"
    hide-footer
    class="customize-table"
  >
    <template #item-actions="item">
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
  </EasyDataTable>
  <div
    class="tw-flex tw-justify-between tw-items-center"
    v-if="products.length > 10"
  >
    <p class="tw-text-sm">
      Mostrando {{ currentPageLastIndex }} de {{ clientItemsLength }} resultados
    </p>
    <v-pagination
      :length="maxPaginationNumber"
      density="compact"
      color="primary"
      v-model="page"
      class="tw-flex-1"
    />
  </div>
</template>

<style scoped></style>
