<script setup lang="ts">
import { ref } from "vue";
import type { Subproduct } from "../../../models/products/Subproduct";
import useStandarProducts from "../../../composables/product/standar/useStandarProducts";
import useSubproductRules from "../../../composables/product/subproduct/useSubproductRules";
import useSubproductMutations from "../../../composables/product/subproduct/useSubproductMutations";
import { useVuelidate } from "@vuelidate/core";
import { productTypeEnum } from "../../../const/productTypeEnum";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";
import type { Product } from "../../../models/products/Product";
import useCategories from "../../../composables/category/useCategories";
import useBrands from "../../../composables/brand/useBrands";
import { usethemeCustomizer } from "@/stores/themeCustomizer";

interface props {
  productProps?: Product;
}
const store = usethemeCustomizer();
const { isStandarProductsLoading, standarProductsDropdown } =
  useStandarProducts();
const { subproductRules } = useSubproductRules();
const props = defineProps<props>();
const { saveSubproductMutation, updateSubproductMutation } =
  useSubproductMutations();
const router = useRouter();
const { categoriesDropdown, isCategoriesLoading } = useCategories();
const { brandsDropdown, isBrandsLoading } = useBrands();

const product = ref<Subproduct>({
  product_type_id: productTypeEnum.SUBPRODUCT,
  taxes: [
    // '9aaede03-d462-412b-b007-317fef91cf11'
    { id: "9aaede03-d617-47bc-b264-74d1e0519177" },
  ],
} as Subproduct);

// 9aaede03-d617-47bc-b264-74d1e0519177 12
// 9aaede03-d462-412b-b007-317fef91cf11 0

const productValidator = useVuelidate(subproductRules, product);

if (props.productProps) {
  product.value.id = props.productProps.id;
  product.value.name = props.productProps.name;
  product.value.sku = props.productProps.sku;
  product.value.price = parseFloat(props.productProps.price);
  product.value.unit_id = props.productProps.unit_id.toString();
  product.value.amount = parseFloat(props.productProps.products[0].amount);
  product.value.parent_product_id =
    props.productProps.products[0].child_product_id;
  product.value.brand_id = props.productProps.brand_id;
  product.value.categoriesId = props.productProps.categories.map((x) => x.id);
}

const onSubproductSubmit = () => {
  productValidator.value.$validate();
  if (!productValidator.value.$error) {
    if (props.productProps) {
      updateSubproductMutation.mutate(product.value);
    } else {
      saveSubproductMutation.mutate(product.value);
    }
  } else {
    alert(
      JSON.stringify(productValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(saveSubproductMutation.isError, () => {
  if (saveSubproductMutation.isError.value) {
    let x = saveSubproductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveSubproductMutation.isSuccess, () => {
  if (saveSubproductMutation.isSuccess.value) {
    router.push({ name: "product-list" });
  }
});

watch(updateSubproductMutation.isError, () => {
  if (updateSubproductMutation.isError.value) {
    let x = updateSubproductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateSubproductMutation.isSuccess, () => {
  if (updateSubproductMutation.isSuccess.value) {
    router.push({ name: "product-list" });
  }
});
</script>

<template>
  <VCard
    class="py-0 px-0"
    :class="store.themeConfig.cardHasShadow ? 'box-card' : ''"
    variant="flat"
  >
    <VCardItem class="py-0 px-0">
      <div class="tw-py-7 tw-px-5">
        <VRow class="mt-2">
          <VCol cols="6" class="py-1">
            <VTextField
              label="name"
              v-model="product.name"
              :error-messages="
                productValidator.name.$errors.map((x) => x.$message.toString())
              "
            />
          </VCol>

          <VCol cols="6" class="py-1">
            <VTextField label="unit_id**" v-model="product.unit_id" />
          </VCol>
          <VCol cols="6" class="py-1">
            <VTextField label="price" v-model="product.price" />
          </VCol>
          <VCol cols="6" class="py-1">
            <VTextField label="amount" v-model="product.amount" />
          </VCol>
          <VCol cols="6" class="py-1">
            <VTextField label="sku" v-model="product.sku" />
          </VCol>
          <VCol cols="6" class="py-1">
            <VSelect
              :disable="props.productProps"
              :loading="isStandarProductsLoading"
              :items="standarProductsDropdown"
              item-title="label"
              item-value="value"
              label="parent"
              v-model="product.parent_product_id"
            />
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
              @click="onSubproductSubmit"
              :loading="
                saveSubproductMutation.isPending.value ||
                updateSubproductMutation.isPending.value
              "
              >crear</VBtn
            >
          </VCol>
        </VRow>
      </div>
    </VCardItem>
  </VCard>
</template>

<style scoped></style>
