<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useComboPoductMutations from "../../../composables/product/combo/useComboPoductMutations";
import { useVuelidate } from "@vuelidate/core";
import type {
  ComboProduct,
  ComboProductChild,
} from "@dashboard/modules/products/models/products/ComboProduct";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { productTypeEnum } from "../../../const/productTypeEnum";
import useStandarProducts from "../../../composables/product/standar/useStandarProducts";
import type { Product } from "../../../models/products/Product";
import useBrands from "../../../composables/brand/useBrands";
import useCategories from "../../../composables/category/useCategories";
import useComboPoductRules from "../../../composables/product/combo/useComboPoductRules";
import { usethemeCustomizer } from "@/stores/themeCustomizer";

const store = usethemeCustomizer();

interface props {
  productProps?: Product;
}
const router = useRouter();
const { comboPoductRules } = useComboPoductRules();
const { isStandarProductsLoading, standarProductsDropdown, standarProducts } =
  useStandarProducts();
const { saveComboProductMutation, updateComboProductMutation } =
  useComboPoductMutations();
const { categoriesDropdown, isCategoriesLoading } = useCategories();
const { brandsDropdown, isBrandsLoading } = useBrands();
const props = defineProps<props>();

const product = ref<ComboProduct>({
  products: [] as ComboProductChild[],
  product_type_id: productTypeEnum.COMBO,
  taxes: [
    // '9aaede03-d462-412b-b007-317fef91cf11'
    "9aaede03-d617-47bc-b264-74d1e0519177",
  ],
} as ComboProduct);
const productValidator = useVuelidate(comboPoductRules, product);
const selectedChilds = ref<string[]>([]);

// 9aaede03-d617-47bc-b264-74d1e0519177 12
// 9aaede03-d462-412b-b007-317fef91cf11 0

if (props.productProps) {
  product.value.id = props.productProps.id;
  product.value.name = props.productProps.name;
  product.value.sku = props.productProps.sku;
  product.value.price = parseFloat(props.productProps.price);
  product.value.unit_id = props.productProps.unit_id.toString();
  product.value.brand_id = props.productProps.brand_id;
  product.value.categoriesId = props.productProps.categories.map((x) => x.id);
  props.productProps.products.map((x) => {
    selectedChilds.value.push(x.child_product_id);
  });
}

const onComboProductSubmit = () => {
  productValidator.value.$validate();
  if (!productValidator.value.$error) {
    if (props.productProps) {
      updateComboProductMutation.mutate(product.value);
    } else {
      saveComboProductMutation.mutate(product.value);
    }
  } else {
    alert(
      JSON.stringify(productValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(updateComboProductMutation.isError, () => {
  if (updateComboProductMutation.isError.value) {
    let x = updateComboProductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateComboProductMutation.isSuccess, () => {
  if (updateComboProductMutation.isSuccess.value) {
    router.push({ name: "product-list" });
  }
});

watch(saveComboProductMutation.isError, () => {
  if (saveComboProductMutation.isError.value) {
    let x = saveComboProductMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveComboProductMutation.isSuccess, () => {
  if (saveComboProductMutation.isSuccess.value) {
    router.push({ name: "product-list" });
  }
});

watch(selectedChilds, () => {
  setChild();
});

watch(standarProducts, () => {
  setChild();
});

function setChild() {
  if (selectedChilds.value.length > 0) {
    if (standarProducts.value) {
      if (props.productProps) {
        let tempChild: ComboProductChild[] = [];
        selectedChilds.value.map((x) => {
          let tempProduct = standarProducts.value.find((y) => y.id == x);
          let tempRelationId = props.productProps?.products.find(
            (z) => z.child_product_id == x
          );
          tempChild.push({
            product_relation_id: tempRelationId!.id,
            amount: 1,
            price: parseFloat(tempProduct!.price),
          });
        });
        product.value.products = tempChild;
        product.value.price = tempChild.reduce((acc, el) => {
          return el.price + acc;
        }, 0);
      } else {
        let tempChild: ComboProductChild[] = [];
        selectedChilds.value.map((x) => {
          let tempProduct = standarProducts.value.find((y) => y.id == x);
          tempChild.push({
            child_product_id: tempProduct!.id,
            amount: 1,
            price: parseFloat(tempProduct!.price),
          });
        });
        product.value.products = tempChild;
        product.value.price = tempChild.reduce((acc, el) => {
          return el.price + acc;
        }, 0);
      }
    }
  } else {
    product.value.products = [];
    product.value.price = 0;
  }
}
</script>
<template>
  <VCard
    class="py-0 px-0"
    :class="store.themeConfig.cardHasShadow ? 'box-card' : ''"
    variant="flat"
  >
    <VCardItem class="py-0 px-0">
      <div class="tw-py-7 tw-px-5">
        <v-row class="mt-2">
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
              :loading="isStandarProductsLoading"
              :items="standarProductsDropdown"
              item-title="label"
              multiple
              item-value="value"
              label="child"
              v-model="selectedChilds"
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
          <v-col cols="12">
            <v-btn
              color="primary"
              @click="onComboProductSubmit"
              :loading="
                saveComboProductMutation.isPending.value ||
                updateComboProductMutation.isPending.value
              "
              >crear</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </VCardItem>
  </VCard>
</template>

<style></style>
