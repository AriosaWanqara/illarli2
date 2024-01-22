<script setup lang="ts">
import ButtonFileUploader from "@/modules/dashboard/components/shared/ButtonFileUploader.vue";
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import useProviders from "../../../persons/composables/provider/useProviders";
import useProducts from "../../../products/composables/product/useProducts";
import type { Product } from "../../../products/models/products/Product";
import usePurchaseMutations from "../../composables/purchase/usePurchaseMutations";
import type { PurchaseToSave2 } from "../../models/PurchaseOrder";
import useXMLPurchaseUpload from "../../composables/purchase/useXMLPurchaseUpload";

const { isProductsLoading, products } = useProducts();
const { isProvidersLoading, providers } = useProviders();
const { savePurchaseEMutations } = usePurchaseMutations();
const { uploadXMLMutations } = useXMLPurchaseUpload();

const selectedProvider = ref();
const selectedProducts = ref<Product[]>([]);
const selectedProductsNotReadOnly = ref<Product[]>([]);
const purchase = ref<PurchaseToSave2>({} as PurchaseToSave2);

const onPurchaseSubmit = () => {
  savePurchaseEMutations.mutate(purchase.value);
};

const onXMLUpload = (xml: File) => {
  // uploadXMLMutations.mutate(xml)
  console.log(xml);
};

watch(selectedProducts, () => {
  selectedProductsNotReadOnly.value = [];
  selectedProducts.value.map((x) => {
    selectedProductsNotReadOnly.value.push({ ...x, amount: 1 });
  });
});

watch(savePurchaseEMutations.isError, () => {
  if (savePurchaseEMutations.isError.value) {
    let x = savePurchaseEMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(savePurchaseEMutations.isSuccess, () => {
  if (savePurchaseEMutations.isSuccess.value) {
    alert("OK");
  }
});
</script>

<template>
  <ViewScaffold title="Crear compra 2">
    <template #action>
      <ButtonFileUploader
        :accept="''"
        :append-icon="''"
        :button-text="'Subir xml'"
        :color="'success'"
        :is-button-loading="uploadXMLMutations.isPending.value"
        :prepend-icon="'mdi-upload'"
        :variant="'tonal'"
        @file-changed="onXMLUpload"
      />
    </template>
    <template #default>
      <VRow>
        <VCol cols="6" class="py-0">
          <VSelect
            placeholder="Provider"
            :items="providers"
            item-title="name"
            return-object
            v-model="selectedProvider"
            :loading="isProvidersLoading"
          />
        </VCol>
        <VCol cols="6" class="py-0">
          <VSelect
            placeholder="Products"
            :items="products"
            item-title="name"
            return-object
            multiple
            v-model="selectedProducts"
            :loading="isProductsLoading"
          />
        </VCol>
        <VCol cols="12" class="py-0">
          <v-table fixed-header id="asd">
            <thead class="table-head">
              <tr>
                <th class="text-left font-weight-black"><p>Cant</p></th>
                <th class="text-left font-weight-black"><p>Nombre</p></th>
                <th class="text-left font-weight-black"><p>Precio</p></th>
              </tr>
            </thead>
            <tbody>
              <TransitionGroup name="fade">
                <tr v-for="data in selectedProductsNotReadOnly" :key="data.id">
                  <td style="padding: 0px; width: 40px">
                    <VTextField
                      v-model="data.amount"
                      class="weight-input"
                    ></VTextField>
                  </td>
                  <td style="max-width: 100px">
                    <div class="item-name">
                      <p class="m-0">{{ data.name }}</p>
                    </div>
                  </td>
                  <td class="pr-0">
                    <div class="d-flex flex-column">
                      <VTextField
                        v-model="data.price"
                        class="weight-input"
                      ></VTextField>
                    </div>
                  </td>
                </tr>
              </TransitionGroup>
            </tbody>
          </v-table>
        </VCol>
        <VCol cols="12">
          <VBtn @click="onPurchaseSubmit">crear</VBtn>
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
