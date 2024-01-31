<script setup lang="ts">
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import type { SRITaxe } from "@/modules/dashboard/modules/pricing/models/SRITaxe";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useStandarProducts from "../../../composables/product/standar/useStandarProducts";
import useSubproductMutations from "../../../composables/product/subproduct/useSubproductMutations";
import useSubproductRules from "../../../composables/product/subproduct/useSubproductRules";
import useCreateProduct from "../../../composables/product/useCreateProduct";
import { productTypeEnum } from "../../../const/productTypeEnum";
import type { Product } from "../../../models/products/Product";
import type { Subproduct } from "../../../models/products/Subproduct";
import ProductGeneralInfo from "./ProductGeneralInfo.vue";

interface props {
  productProps?: Product;
}
const { isStandarProductsLoading, standarProductsDropdown } =
  useStandarProducts();
const { subproductRules } = useSubproductRules();
const props = defineProps<props>();
const { saveSubproductMutation, updateSubproductMutation } =
  useSubproductMutations();
const router = useRouter();
const { product, nameError } = useCreateProduct();
const subporduct = ref<Subproduct>({
  product_type_id: productTypeEnum.SUBPRODUCT,
  taxes: [] as SRITaxe[],
} as Subproduct);
const productValidator = useVuelidate(subproductRules, subporduct);

watch(
  () => subporduct.value.skus,
  () => {
    product.value.skus = [];
    subporduct.value.skus.map((x) => {
      product.value.skus.push(x.code);
    });
  },
  { deep: true }
);

watch(
  () => product.value.name,
  () => {
    subporduct.value.name = product.value.name;
  }
);

watch(
  () => productValidator.value.name.$errors,
  () => {
    if (productValidator.value.name.$errors.length > 0) {
      nameError.value = productValidator.value.name.$errors.map((x) =>
        x.$message.toString()
      );
    } else {
      nameError.value = [];
    }
  },
  { deep: true }
);

if (props.productProps) {
  subporduct.value.id = props.productProps.id;
  subporduct.value.name = props.productProps.name;
  product.value.skus = [];
  props.productProps.skus.map((x) => {
    product.value.skus.push(x.code);
  });
  subporduct.value.price = parseFloat(props.productProps.price);
  subporduct.value.unit_id = props.productProps.unit_id.toString();
  subporduct.value.amount = parseFloat(props.productProps.products[0].amount);
  subporduct.value.parent_product_id =
    props.productProps.products[0].child_product_id;
  subporduct.value.categoriesId = props.productProps.categories;
}

const onSubproductSubmit = () => {
  subporduct.value.unit_id = "1";
  productValidator.value.$validate();
  if (!productValidator.value.$error) {
    if (props.productProps) {
      updateSubproductMutation.mutate(subporduct.value);
    } else {
      saveSubproductMutation.mutate(subporduct.value);
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
  <UIParentCardV2>
    <div class="tw-py-7 tw-px-5">
      <ProductGeneralInfo
        :product="subporduct"
        :code-error="
          productValidator.skus.$errors.map((x) => x.$message.toString())
        "
        class="tw-pb-4"
      />
      <VRow>
        <VCol cols="6" class="py-1">
          <VTextField placeholder="price" v-model="subporduct.price" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField placeholder="amount" v-model="subporduct.amount" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            :disable="props.productProps"
            :loading="isStandarProductsLoading"
            :items="standarProductsDropdown"
            item-title="label"
            item-value="value"
            placeholder="parent"
            v-model="subporduct.parent_product_id"
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
  </UIParentCardV2>
</template>

<style scoped></style>
