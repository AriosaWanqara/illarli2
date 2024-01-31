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
import useCreateProduct from "../../../composables/product/useCreateProduct";
import { productTypeEnum } from "../../../const/productTypeEnum";
import type { Product } from "../../../models/products/Product";
import ProductGeneralInfo from "./ProductGeneralInfo.vue";
import ProductPromotions from "./ProductPromotions.vue";
import ProductSizingForm from "./ProductSizingForm.vue";

interface props {
  productProps?: Product;
}
const router = useRouter();
const { comboPoductRules } = useComboPoductRules();

const { saveComboProductMutation, updateComboProductMutation } =
  useComboPoductMutations();
const props = defineProps<props>();
const { product, nameError } = useCreateProduct();
const comboProduct = ref<ComboProduct>({
  products: [] as ComboProductChild[],
  product_type_id: productTypeEnum.COMBO,
  taxes: [] as SRITaxe[],
} as ComboProduct);
comboProduct.value.discount = [];
const productValidator = useVuelidate(comboPoductRules, comboProduct);
const selectedChilds = ref<string[]>([]);
const tab = ref();

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
</script>
<template>
  <UIParentCardV2>
    <div class="tw-py-7 tw-px-5">
      <v-tabs v-model="tab">
        <v-tab value="1">Producto *</v-tab>
        <v-tab value="2">Combo *</v-tab>
        <v-tab value="3">Promociones</v-tab>
        <v-tab value="4">Tamaño</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="1">
          <ProductGeneralInfo
            class="tw-mb-5"
            :product="comboProduct"
            :code-error="
              productValidator.skus.$errors.map((x) => x.$message.toString())
            "
          />
        </v-window-item>

        <v-window-item value="2"> Two </v-window-item>

        <v-window-item value="3">
          <ProductPromotions :product="comboProduct" />
        </v-window-item>
        <v-window-item value="4">
          <ProductSizingForm :product="comboProduct" />
        </v-window-item>
      </v-window>
      <v-col cols="12">
        <div class="tw-flex tw-justify-end tw-gap-2">
          <VBtn
            @click="router.push({ name: 'product-list' })"
            variant="outlined"
            color="borderColor"
          >
            <p class="textPrimary">cancelar</p>
          </VBtn>
          <v-btn
            color="success"
            prepend-icon="mdi-plus"
            @click="onComboProductSubmit"
            :loading="
              saveComboProductMutation.isPending.value ||
              updateComboProductMutation.isPending.value
            "
          >
            Añadir producto
          </v-btn>
        </div>
      </v-col>
    </div>
  </UIParentCardV2>
</template>

<style></style>
