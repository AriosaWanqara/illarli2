<script setup lang="ts">
import type { StandarProduct } from "@dashboard/modules/products/models/products/StandarProduct";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useStandarPoductMutations from "../../composables/product/standar/useStandarPoductMutations";
import useStandarPoductRules from "../../composables/product/standar/useStandarPoductRules";
import { productTypeEnum } from "../../const/productTypeEnum";
import type { Product } from "../../models/products/Product";
import useCategories from "../../composables/category/useCategories";
import useBrands from "../../composables/brand/useBrands";

interface props {
  productProps?: Product;
}

const { standarPoductRules } = useStandarPoductRules();
const { saveStandarProductMutation, updateStandarProductMutation } =
  useStandarPoductMutations();
const { categoriesDropdown, isCategoriesLoading } = useCategories();
const { brandsDropdown, isBrandsLoading } = useBrands();
const props = defineProps<props>();
const product = ref<StandarProduct>({
  product_type_id: productTypeEnum.STANDAR,
  taxes: [1],
  stock: 100,
} as StandarProduct);
const productValidator = useVuelidate(standarPoductRules, product);
const router = useRouter();

if (props.productProps) {
  product.value.id = props.productProps.id;
  product.value.name = props.productProps.name;
  product.value.sku = props.productProps.sku;
  product.value.price = parseFloat(props.productProps.price);
  product.value.unit_id = props.productProps.unit_id.toString();
  product.value.brand_id = props.productProps.brand_id;
  product.value.categoriesId = props.productProps.categories.map((x) => x.id);
}

const onStandarProductSubmit = () => {
  productValidator.value.$validate();
  if (!productValidator.value.$error) {
    product.value.unit_id = "1";
    if (props.productProps) {
      updateStandarProductMutation.mutate(product.value);
    } else {
      saveStandarProductMutation.mutate(product.value);
    }
  } else {
    alert(
      JSON.stringify(productValidator.value.$errors.map((x) => x.$message))
    );
  }
};

watch(saveStandarProductMutation.isError, () => {
  if (saveStandarProductMutation.isError.value) {
    let x = saveStandarProductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveStandarProductMutation.isSuccess, () => {
  if (saveStandarProductMutation.isSuccess.value) {
    router.push({ name: "product-list" });
  }
});

watch(updateStandarProductMutation.isError, () => {
  if (updateStandarProductMutation.isError.value) {
    let x = updateStandarProductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateStandarProductMutation.isSuccess, () => {
  if (updateStandarProductMutation.isSuccess.value) {
    router.push({ name: "product-list" });
  }
});
</script>
<template>
  <VRow class="mt-2">
    <VCol cols="6" class="py-1">
      <VTextField label="name" v-model="product.name" />
    </VCol>
    <VCol cols="6" class="py-1">
      <VTextField label="sku" v-model="product.sku" />
    </VCol>

    <VCol cols="6" class="py-1">
      <VTextField label="unit_id**" v-model="product.unit_id" />
    </VCol>
    <VCol cols="6" class="py-1">
      <VTextField label="price" v-model="product.price" />
    </VCol>
    <VCol cols="6" class="py-1">
      <VSelect
        label="categories"
        multiple
        v-model="product.categoriesId"
        :items="categoriesDropdown"
        :loading="isCategoriesLoading"
        item-title="label"
        item-value="value"
      />
    </VCol>
    <VCol cols="6" class="py-1">
      <VSelect
        label="Brand"
        v-model="product.brand_id"
        :items="brandsDropdown"
        item-title="label"
        item-value="value"
        :loading="isBrandsLoading"
      />
    </VCol>
    <VCol cols="12">
      <VBtn
        color="primary"
        @click="onStandarProductSubmit"
        :loading="
          saveStandarProductMutation.isPending.value ||
          updateStandarProductMutation.isPending.value
        "
        >crear</VBtn
      >
    </VCol>
  </VRow>
</template>

<style scoped></style>
