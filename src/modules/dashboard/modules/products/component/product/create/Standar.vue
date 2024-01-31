<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import PriceCalculatorComponent from "@/modules/dashboard/components/shared/PriceCalculatorComponent.vue";
import useSRITaxes from "@/modules/dashboard/modules/pricing/compossables/SRI/useSRITaxes";
import type { SRITaxe } from "@/modules/dashboard/modules/pricing/models/SRITaxe";
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
import ProductPromotions from "./ProductPromotions.vue";
import ProductSizingForm from "./ProductSizingForm.vue";
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import draggable from "vuedraggable";

interface props {
  productProps?: Product;
}

const { standarPoductRules } = useStandarPoductRules();
const { isTaxesLoading, taxes, taxesHasError } = useSRITaxes();
const { product, nameError } = useCreateProduct();
const { saveStandarProductMutation, updateStandarProductMutation } =
  useStandarPoductMutations();
const props = defineProps<props>();
const standarProduct = ref<StandarProduct>({
  product_type_id: productTypeEnum.STANDAR,
  taxes: [] as SRITaxe[],
  skus: [] as { code: string }[],
} as StandarProduct);
standarProduct.value.categoriesId = [];
const productValidator = useVuelidate(standarPoductRules, standarProduct);
const router = useRouter();
const selectedRatesPercentage = ref<{ name: string; value: number }[]>([]);
const showCalculator = ref(false);
const tab = ref();

if (props.productProps) {
  product.value.name = props.productProps.name;
  // product.value.skus = props.productProps.skus;
  standarProduct.value.id = props.productProps.id;
  standarProduct.value.name = props.productProps.name;
  standarProduct.value.skus = props.productProps.skus;
  standarProduct.value.price = parseFloat(props.productProps.price);
  standarProduct.value.unit_id = props.productProps.unit_id.toString();
  standarProduct.value.brand_id = { id: props.productProps.brand_id } as Brand;
  standarProduct.value.categoriesId = props.productProps.categories;
}

watch(
  () => standarProduct.value.skus,
  () => {
    product.value.skus = [];
    standarProduct.value.skus.map((x) => {
      product.value.skus.push(x.code);
    });
  },
  { deep: true }
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

const checkTaxesSelected = (params: SRITaxe[]) => {
  if (params.length > 0) {
    console.log(params.length);
    if (
      params.filter((x) => x.code == params[params.length - 1].code).length > 1
    ) {
      let lastTaxesRemove = params.pop();
      standarProduct.value.taxes = params;
      alert("solo puede escoger un tipo de " + lastTaxesRemove?.parent);
    }
  }
};
</script>
<template>
  <UIParentCardV2>
    <div class="tw-py-7 tw-px-5">
      <v-tabs v-model="tab" density="compact">
        <v-tab value="one" density="compact" color="secondary">Producto*</v-tab>
        <v-tab value="two" density="compact" color="secondary"
          >Promociones</v-tab
        >
        <v-tab value="three" density="compact" color="secondary">Tamaño</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="one">
          <ProductGeneralInfo
            :product="standarProduct"
            :code-error="
              productValidator.skus.$errors.map((x) => x.$message.toString())
            "
          />
          <FormSeccion title="Valor-impuestos" class="tw-mt-2" border>
            <VRow>
              <VCol cols="6" md="6" class="py-1">
                <InputSection label-message="Impuesto" required>
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
                    :no-data-text="
                      taxesHasError
                        ? 'Error del servidor 🥲'
                        : 'No hay registros'
                    "
                    return-object
                    @update:modelValue="checkTaxesSelected"
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
                </InputSection>
              </VCol>
              <VCol cols="6" md="6" class="py-1">
                <InputSection label-message="Precio con imp" required>
                  <div class="tw-flex">
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
                    <VBtn
                      @click="onProductCalculateHelp"
                      color="info"
                      density="default"
                    >
                      <p class="textPrimary">Calcular</p>
                    </VBtn>
                  </div>
                </InputSection>
              </VCol>
            </VRow>
          </FormSeccion>
        </v-window-item>

        <v-window-item value="two">
          <ProductPromotions :product="standarProduct" />
        </v-window-item>

        <v-window-item value="three">
          <ProductSizingForm :product="standarProduct" />
        </v-window-item>
      </v-window>
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
    </div>
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
  </UIParentCardV2>
</template>

<style scoped></style>
