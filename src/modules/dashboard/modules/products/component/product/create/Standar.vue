<script setup lang="ts">
import { usethemeCustomizer } from "@/stores/themeCustomizer";
import type { StandarProduct } from "@dashboard/modules/products/models/products/StandarProduct";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useStandarPoductMutations from "../../../composables/product/standar/useStandarPoductMutations";
import useStandarPoductRules from "../../../composables/product/standar/useStandarPoductRules";
import useCreateProduct from "../../../composables/product/useCreateProduct";
import { productTypeEnum } from "../../../const/productTypeEnum";
import type { Product } from "../../../models/products/Product";
import ProductGeneralInfo from "./ProductGeneralInfo.vue";

interface props {
  productProps?: Product;
}
const store = usethemeCustomizer();

const { standarPoductRules } = useStandarPoductRules();
const { product, nameError } = useCreateProduct();
const { saveStandarProductMutation, updateStandarProductMutation } =
  useStandarPoductMutations();
const props = defineProps<props>();
const standarProduct = ref<StandarProduct>({
  product_type_id: productTypeEnum.STANDAR,
  taxes: [
    // '9aaede03-d462-412b-b007-317fef91cf11' //0
    { id: "9aaede03-d617-47bc-b264-74d1e0519177" }, //12
  ],
} as StandarProduct);
const productValidator = useVuelidate(standarPoductRules, standarProduct);
const router = useRouter();

if (props.productProps) {
  product.value.name = props.productProps.name;
  product.value.sku = props.productProps.sku;
  standarProduct.value.id = props.productProps.id;
  standarProduct.value.name = props.productProps.name;
  standarProduct.value.sku = props.productProps.sku;
  standarProduct.value.price = parseFloat(props.productProps.price);
  standarProduct.value.unit_id = props.productProps.unit_id.toString();
  standarProduct.value.brand_id = props.productProps.brand_id;
  standarProduct.value.categoriesId = props.productProps.categories.map(
    (x) => x.id
  );
}

watch(
  () => standarProduct.value.sku,
  () => {
    product.value.sku = standarProduct.value.sku;
  }
);

const onStandarProductSubmit = () => {
  standarProduct.value.name = product.value.name;
  standarProduct.value.unit_id = "1";
  standarProduct.value.price = 1;
  productValidator.value.$validate();
  if (!productValidator.value.$error) {
    if (props.productProps) {
      updateStandarProductMutation.mutate(standarProduct.value);
    } else {
      saveStandarProductMutation.mutate(standarProduct.value);
    }
  } else {
    alert(
      JSON.stringify(productValidator.value.$errors.map((x) => x.$message))
    );
  }
};
watch(
  () => product.value.name,
  () => {
    standarProduct.value.name = product.value.name;
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
  <VCard
    class="py-0 px-0"
    :class="store.themeConfig.cardHasShadow ? 'box-card' : ''"
    variant="flat"
  >
    <VCardItem class="py-0 px-0">
      <div class="tw-py-7 tw-px-5">
        <ProductGeneralInfo
          :product="standarProduct"
          :code-error="
            productValidator.sku.$errors.map((x) => x.$message.toString())
          "
        />
        <div class="tw-flex tw-justify-end tw-gap-2 tw-mt-2">
          <VBtn
            @click="router.push({ name: 'product-list' })"
            variant="outlined"
            color="borderColor"
          >
            <p class="textPrimary">cancelar</p>
          </VBtn>
          <VBtn
            prepend-icon="mdi-plus"
            color="success"
            :loading="
              saveStandarProductMutation.isPending.value ||
              updateStandarProductMutation.isPending.value
            "
            @click="onStandarProductSubmit"
            >Añadir producto</VBtn
          >
        </div>
      </div>
    </VCardItem>
  </VCard>
</template>

<style scoped></style>
