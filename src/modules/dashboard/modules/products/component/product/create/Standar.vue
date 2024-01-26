<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import PriceCalculatorComponent from "@/modules/dashboard/components/shared/PriceCalculatorComponent.vue";
import useSRITaxes from "@/modules/dashboard/modules/pricing/compossables/SRI/useSRITaxes";
import type { SRITaxe } from "@/modules/dashboard/modules/pricing/models/SRITaxe";
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
import type { Brand } from "../../../models/Brand";
import type { Product } from "../../../models/products/Product";
import ProductGeneralInfo from "./ProductGeneralInfo.vue";

interface props {
  productProps?: Product;
}
const store = usethemeCustomizer();

const { standarPoductRules } = useStandarPoductRules();
const { isTaxesLoading, taxes, taxesHasError } = useSRITaxes();
const { product, nameError } = useCreateProduct();
const { saveStandarProductMutation, updateStandarProductMutation } =
  useStandarPoductMutations();
const props = defineProps<props>();
const standarProduct = ref<StandarProduct>({
  product_type_id: productTypeEnum.STANDAR,
  taxes: [] as SRITaxe[],
} as StandarProduct);
standarProduct.value.categoriesId = [];
const productValidator = useVuelidate(standarPoductRules, standarProduct);
const router = useRouter();
const selectedRatesPercentage = ref<{ name: string; value: number }[]>([]);
const showCalculator = ref(false);

if (props.productProps) {
  product.value.name = props.productProps.name;
  product.value.sku = props.productProps.sku;
  standarProduct.value.id = props.productProps.id;
  standarProduct.value.name = props.productProps.name;
  standarProduct.value.sku = props.productProps.sku;
  standarProduct.value.price = parseFloat(props.productProps.price);
  standarProduct.value.unit_id = props.productProps.unit_id.toString();
  standarProduct.value.brand_id = { id: props.productProps.brand_id } as Brand;
  standarProduct.value.categoriesId = props.productProps.categories;
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
  productValidator.value.$validate();
  if (!productValidator.value.$error) {
    if (props.productProps) {
      updateStandarProductMutation.mutate(standarProduct.value);
    } else {
      saveStandarProductMutation.mutate(standarProduct.value);
    }
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

const onProductCalculateHelp = () => {
  if (standarProduct.value.taxes.length > 0) {
    selectedRatesPercentage.value = [];
    standarProduct.value.taxes.map((x) => {
      selectedRatesPercentage.value.push({
        name: x.name,
        value: parseFloat(x.rate),
      });
    });
    showCalculator.value = true;
  }
};
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
        <FormSeccion title="Valor-impuestos" class="tw-mt-2">
          <VRow>
            <VCol cols="6" md="6" class="py-1">
              <div class="tw-flex tw-flex-col tw-gap-1">
                <label
                  for=""
                  class="tw-font-semibold tw-text-gray-400 tw-uppercase"
                >
                  Impuesto<span class="tw-text-red-300">*</span>
                </label>
                <VSelect
                  hide-details
                  item-value="id"
                  item-title="name"
                  :error-messages="
                    productValidator.taxes.$errors.map((x) =>
                      x.$message.toString()
                    )
                  "
                  :items="taxes"
                  :loading="isTaxesLoading"
                  return-object
                  multiple
                  placeholder="Impuesto"
                  v-model="standarProduct.taxes"
                >
                  <template v-slot:selection="{ item, index }">
                    <span v-if="index < 1">{{ item.title }}</span>
                    <span
                      v-if="index === 1"
                      class="text-grey text-caption align-self-center"
                    >
                      (+{{ standarProduct.taxes.length - 1 }} others)
                    </span>
                  </template>
                </VSelect>
              </div>
            </VCol>
            <VCol cols="6" md="6" class="py-1">
              <div class="tw-flex tw-items-end">
                <div class="tw-flex tw-flex-col tw-gap-1 tw-flex-1">
                  <label
                    for=""
                    class="tw-font-semibold tw-text-gray-400 tw-uppercase"
                  >
                    Precio con imp<span class="tw-text-red-300">*</span>
                  </label>
                  <VTextField
                    hide-details
                    :error-messages="
                      productValidator.price.$errors.map((x) =>
                        x.$message.toString()
                      )
                    "
                    placeholder="Precio"
                    v-model="standarProduct.price"
                  />
                </div>
                <VBtn
                  @click="onProductCalculateHelp"
                  color="info"
                  density="default"
                >
                  <p class="textPrimary">Calcular</p>
                </VBtn>
              </div>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" class="py-0">
              <div class="tw-flex tw-justify-end tw-gap-2 tw-mt-[5px]">
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
            </VCol>
          </VRow>
        </FormSeccion>
      </div>
    </VCardItem>
    <VDialog max-width="400" v-model="showCalculator">
      <PriceCalculatorComponent
        :rates="selectedRatesPercentage"
        @close="
          () => {
            showCalculator = false;
          }
        "
        @calculate-end="
          (params) => {
            standarProduct.price = params;
            showCalculator = false;
          }
        "
      />
    </VDialog>
  </VCard>
</template>

<style scoped></style>
