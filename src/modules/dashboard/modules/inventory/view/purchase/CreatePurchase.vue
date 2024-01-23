<script setup lang="ts">
import ButtonFileUploader from "@/modules/dashboard/components/shared/ButtonFileUploader.vue";
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import { useUserStore } from "@/stores/userStore";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import useWareHouses from "../../../config/composables/warehouse/useWareHouses";
import useProviders from "../../../persons/composables/provider/useProviders";
import useProducts from "../../../products/composables/product/useProducts";
import type { Product } from "../../../products/models/products/Product";
import PurchaseXMLSteperProcesor from "../../components/purchase/PurchaseXMLSteperProcesor.vue";
import usePurchaseMutations from "../../composables/purchase/usePurchaseMutations";
import useXMLPurchaseUpload from "../../composables/purchase/useXMLPurchaseUpload";
import type { PurchaseToSave2 } from "../../models/PurchaseOrder";
import moment from "moment";
import type { Purchases2 } from "../../models/Purchases";

const { isProductsLoading, products } = useProducts();
const { isProvidersLoading, providers } = useProviders();
const { savePurchaseEMutations } = usePurchaseMutations();
const { uploadXMLMutations } = useXMLPurchaseUpload();
const { isWareHousesLoading, wareHouses } = useWareHouses();

const { user } = useUserStore();
const dialog = ref(false);

const selectedProducts = ref<Product[]>([]);
const selectedProductsNotReadOnly = ref<Product[]>([]);
const purchase = ref<PurchaseToSave2>({} as PurchaseToSave2);
const uploadPurchase = ref<Purchases2>();

const onPurchaseSubmit = () => {
  purchase.value.days = "0";
  purchase.value.subsidiary_id = user.subsidiaries[0].id;
  purchase.value.details = [];
  purchase.value.subtotal = 0;
  purchase.value.tip = 0;
  purchase.value.discount = 0;
  purchase.value.total = 0;
  purchase.value.taxes = [];
  purchase.value.date = moment(new Date()).format("YYYY-MM-DD HH:mm");
  selectedProductsNotReadOnly.value.map((x) => {
    purchase.value.details?.push({
      amount: x.amount,
      price: x.price,
      product: x,
      product_id: x.id,
      spent: false,
    });
  });
  savePurchaseEMutations.mutate(purchase.value);
};

const onXMLUpload = (xml: File) => {
  uploadXMLMutations.mutate(xml);
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

watch(uploadXMLMutations.isError, () => {
  if (uploadXMLMutations.isError.value) {
  }
});

watch(uploadXMLMutations.isSuccess, () => {
  if (uploadXMLMutations.isSuccess.value) {
    let response = uploadXMLMutations.data.value;
    if (response) {
      let products: Product[] = [];
      response.products.map((x) => products.push({ ...x }));
      uploadPurchase.value = { ...response, products: products };
    }
    dialog.value = true;
  }
});
</script>

<template>
  <ViewScaffold title="Crear compra 2">
    <template #action>
      <div class="tw-flex tw-gap-2 tw-justify-center">
        <VBtn v-if="uploadPurchase" @click="dialog = true">abrir</VBtn>
        <ButtonFileUploader
          :accept="'.xml'"
          :append-icon="''"
          :button-text="'Subir xml'"
          :color="'success'"
          :is-button-loading="uploadXMLMutations.isPending.value"
          :prepend-icon="'mdi-upload'"
          :variant="'tonal'"
          @file-changed="onXMLUpload"
        />
      </div>
    </template>
    <template #default>
      <VRow>
        <VCol cols="6" class="py-0">
          <VSelect
            placeholder="Provider"
            :items="providers"
            item-title="name"
            item-value="id"
            v-model="purchase.supplier_id"
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
        <VCol cols="6" class="py-0">
          <VTextField placeholder="Factura" v-model="purchase.invoice" />
        </VCol>
        <VCol cols="6" class="py-0">
          <VSelect
            placeholder="Bodega"
            :items="wareHouses"
            item-title="name"
            item-value="id"
            :loading="isWareHousesLoading"
            v-model="purchase.warehouse_id"
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
          <VBtn
            @click="onPurchaseSubmit"
            :loading="savePurchaseEMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
      <VDialog
        v-model="dialog"
        :scrim="false"
        fullscreen
        transition="dialog-bottom-transition"
      >
        <PurchaseXMLSteperProcesor
          @close="dialog = false"
          v-if="uploadPurchase"
          :purchase="uploadPurchase"
        />
      </VDialog>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
