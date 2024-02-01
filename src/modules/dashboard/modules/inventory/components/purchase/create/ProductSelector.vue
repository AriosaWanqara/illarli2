<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import useProducts from "@/modules/dashboard/modules/products/composables/product/useProducts";
import { ref } from "vue";
import type { Header } from "vue3-easy-data-table";
import imgNotFound from "@/assets/Image-not-found.png";
import addCard from "@/assets/ic_add_car.png";
import type { Product } from "@/modules/dashboard/modules/products/models/products/Product";

const emits = defineEmits(["products-selected-return"]);

const { isProductsLoading, products, productsHasError } = useProducts();
const headers: Header[] = [
  { text: "Producto", value: "name" },
  { text: "Cod", value: "skus" },
  { text: "Stock", value: "stock" },
  { text: "Status", value: "active" },
  { text: "Precio/uni", value: "price" },
  { text: "", value: "actions", width: 50 },
];

const seacrh = ref();
const selectedProducts = ref<Product[]>([]);

const onItemSelected = (productSelected: Product) => {
  if (selectedProducts.value.some((x) => x.id == productSelected.id)) {
    selectedProducts.value.find((x) => x.id == productSelected.id)!.amount++;
  } else {
    selectedProducts.value.push({ ...productSelected });
  }
  emits("products-selected-return", selectedProducts.value);
};
</script>

<template>
  <FormSeccion title="Disponibilidad de Productos" border>
    <div class="tw-flex tw-flex-col tw-gap-3">
      <VTextField
        variant="outlined"
        placeholder="Buscar producto"
        prepend-inner-icon="mdi-magnify"
        v-model="seacrh"
      />
      <BaseTableComponent
        :headers="headers"
        :is-table-loading="isProductsLoading"
        :search="seacrh"
        :items="products"
        :is-error="productsHasError"
      >
        <template #name="{ item }">
          <div class="tw-flex tw-gap-3 tw-items-center">
            <div
              class="tw-w-[40px] tw-h-[40px] tw-rounded-md tw-overflow-hidden tw-shrink-0"
            >
              <VImg :src="item.img ? item.img : imgNotFound" />
            </div>
            <p class="tw-font-semibold">{{ item.name }}</p>
          </div>
        </template>
        <template #skus="{ item }">
          <p>{{ item.skus[0].code }}</p>
        </template>
        <template #stock="{ item }">
          <p class="tw-text-red-500">{{ item.stock }}</p>
        </template>
        <template #price="{ item }">
          <p class="tw-font-semibold">
            ${{ parseFloat(item.price).toFixed(2) }}
          </p>
        </template>
        <template #actions="{ item }">
          <VImg :src="addCard" height="40" @click="onItemSelected(item)" />
        </template>
      </BaseTableComponent>
    </div>
  </FormSeccion>
</template>

<style scoped></style>
