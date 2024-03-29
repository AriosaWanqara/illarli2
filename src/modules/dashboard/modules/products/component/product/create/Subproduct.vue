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
import ProductPromotions from "./ProductPromotions.vue";
import ProductSizingForm from "./ProductSizingForm.vue";
import useSRITaxes from "@/modules/dashboard/modules/pricing/compossables/SRI/useSRITaxes";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";

interface props {
  productProps?: Product;
}

const { isTaxesLoading, taxes, taxesHasError } = useSRITaxes();
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
subporduct.value.discount = [];
const productValidator = useVuelidate(subproductRules, subporduct);
const tab = ref();

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

const checkTaxesSelected = (params: SRITaxe[]) => {
  if (params.length > 0) {
    console.log(params.length);
    if (
      params.filter((x) => x.code == params[params.length - 1].code).length > 1
    ) {
      let lastTaxesRemove = params.pop();
      subporduct.value.taxes = params;
      alert("solo puede escoger un tipo de " + lastTaxesRemove?.parent);
    }
  }
};
const onProductCalculateHelp = () => {
  if (subporduct.value.taxes.length > 0) {
  }
};
</script>

<template>
  <UIParentCardV2>
    <div class="tw-py-7 tw-px-5">
      <v-tabs v-model="tab">
        <v-tab value="1">Producto *</v-tab>
        <v-tab value="2">Padre *</v-tab>
        <v-tab value="3">Promociones</v-tab>
        <v-tab value="4">Tamaño</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="1">
          <ProductGeneralInfo
            :product="subporduct"
            :code-error="
              productValidator.skus.$errors.map((x) => x.$message.toString())
            "
            class="tw-pb-4"
          />
          <FormSeccion title="Valor-impuestos" class="tw-mt-2" border>
            <VRow>
              <VCol cols="6" md="6" class="py-1">
                <InputSection label-message="Impuesto" required>
                  <VSelect
                    hide-details
                    item-value="id"
                    item-title="name"
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
                    v-model="subporduct.taxes"
                  >
                    <template v-slot:selection="{ item, index }">
                      <span v-if="index < 1">{{ item.title }}</span>
                      <span
                        v-if="index === 1"
                        class="text-grey text-caption align-self-center"
                      >
                        (+{{ subporduct.taxes.length - 1 }} others)
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
                      v-model="subporduct.price"
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

        <v-window-item value="2"> Two </v-window-item>

        <v-window-item value="3">
          <ProductPromotions :product="subporduct" />
        </v-window-item>
        <v-window-item value="4">
          <ProductSizingForm :product="subporduct" />
        </v-window-item>
      </v-window>
      <VCol cols="12">
        <div class="tw-flex tw-justify-end tw-gap-2">
          <VBtn
            @click="router.push({ name: 'product-list' })"
            variant="outlined"
            color="borderColor"
          >
            <p class="textPrimary">cancelar</p>
          </VBtn>
          <VBtn
            color="success"
            prepend-icon="mdi-plus"
            @click="onSubproductSubmit"
            :loading="
              saveSubproductMutation.isPending.value ||
              updateSubproductMutation.isPending.value
            "
          >
            Añadir producto
          </VBtn>
        </div>
      </VCol>
    </div>
  </UIParentCardV2>
</template>

<style scoped></style>
