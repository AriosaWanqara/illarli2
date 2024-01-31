<script setup lang="ts">
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import type { SRITaxe } from "@/modules/dashboard/modules/pricing/models/SRITaxe";
import type {
  ComboProduct,
  ComboProductChild,
} from "@dashboard/modules/products/models/products/ComboProduct";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useComboPoductMutations from "../../../composables/product/combo/useComboPoductMutations";
import useComboPoductRules from "../../../composables/product/combo/useComboPoductRules";
import useStandarProducts from "../../../composables/product/standar/useStandarProducts";
import useCreateProduct from "../../../composables/product/useCreateProduct";
import { productTypeEnum } from "../../../const/productTypeEnum";
import type { Product } from "../../../models/products/Product";
import ProductGeneralInfo from "./ProductGeneralInfo.vue";

interface props {
  productProps?: Product;
}
const router = useRouter();
const { comboPoductRules } = useComboPoductRules();
const { isStandarProductsLoading, standarProductsDropdown, standarProducts } =
  useStandarProducts();
const { saveComboProductMutation, updateComboProductMutation } =
  useComboPoductMutations();
const props = defineProps<props>();
const { product, nameError } = useCreateProduct();
const comboProduct = ref<ComboProduct>({
  products: [] as ComboProductChild[],
  product_type_id: productTypeEnum.COMBO,
  taxes: [] as SRITaxe[],
} as ComboProduct);
const productValidator = useVuelidate(comboPoductRules, comboProduct);
const selectedChilds = ref<string[]>([]);

if (props.productProps) {
  comboProduct.value.id = props.productProps.id;
  comboProduct.value.name = props.productProps.name;
  product.value.skus = [];
  props.productProps.skus.map((x) => {
    product.value.skus.push(x.code);
  });
  comboProduct.value.price = parseFloat(props.productProps.price);
  comboProduct.value.unit_id = props.productProps.unit_id.toString();
  comboProduct.value.categoriesId = props.productProps.categories;
  props.productProps.products.map((x) => {
    selectedChilds.value.push(x.child_product_id);
  });
}
watch(
  () => comboProduct.value.skus,
  () => {
    product.value.skus = [];
    comboProduct.value.skus.map((x) => {
      product.value.skus.push(x.code);
    });
  },
  { deep: true }
);

watch(
  () => product.value.name,
  () => {
    comboProduct.value.name = product.value.name;
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

const onComboProductSubmit = () => {
  comboProduct.value.unit_id = "1";
  productValidator.value.$validate();
  if (!productValidator.value.$error) {
    if (props.productProps) {
      updateComboProductMutation.mutate(comboProduct.value);
    } else {
      saveComboProductMutation.mutate(comboProduct.value);
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
        comboProduct.value.products = tempChild;
        comboProduct.value.price = tempChild.reduce((acc, el) => {
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
        comboProduct.value.products = tempChild;
        comboProduct.value.price = tempChild.reduce((acc, el) => {
          return el.price + acc;
        }, 0);
      }
    }
  } else {
    comboProduct.value.products = [];
    comboProduct.value.price = 0;
  }
}
</script>
<template>
  <UIParentCardV2>
    <div class="tw-py-7 tw-px-5">
      <ProductGeneralInfo
        class="tw-mb-5"
        :product="comboProduct"
        :code-error="
          productValidator.skus.$errors.map((x) => x.$message.toString())
        "
      />
      <v-row class="mt-2">
        <VCol cols="6" class="py-1">
          <VTextField label="price" v-model="comboProduct.price" />
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
  </UIParentCardV2>
</template>

<style></style>
