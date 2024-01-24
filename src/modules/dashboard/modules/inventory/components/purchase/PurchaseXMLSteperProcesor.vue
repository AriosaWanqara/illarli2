<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import useProducts from "../../../products/composables/product/useProducts";
import type { Product } from "../../../products/models/products/Product";
import type { Purchases2 } from "../../models/Purchases";
import {
  createPurchaseToSaveFromPurchase,
  type PurchaseToSave2,
} from "../../models/PurchaseOrder";
import useWareHouses from "../../../config/composables/warehouse/useWareHouses";
import { useUserStore } from "@/stores/userStore";
import usePurchaseMutations from "../../composables/purchase/usePurchaseMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import moment from "moment";

interface props {
  purchase: Purchases2;
}

const props = defineProps<props>();
const emits = defineEmits(["close"]);
const { products, isProductsLoading } = useProducts();
const { isWareHousesLoading, wareHouses } = useWareHouses();
const { savePurchaseFromXMLMutations } = usePurchaseMutations();
const { user } = useUserStore();

const purchase = ref<PurchaseToSave2>({
  subsidiary_id: user.subsidiaries[0].id,
} as PurchaseToSave2);

const mutableProducts = ref<Product[]>([]);
const step = ref(1);
let productsS: Product[] = [];

const next = () => {
  step.value = 2;
  mutableProducts.value = [];
  props.purchase.products.map((x) => mutableProducts.value.push({ ...x }));
};
const back = () => {
  step.value = 1;
  mutableProducts.value = [];
};

const onPurchaseSubmit = () => {
  productsS = props.purchase.products;
  props.purchase.products = mutableProducts.value;
  let x = createPurchaseToSaveFromPurchase(props.purchase);
  purchase.value = {
    ...x,
    subsidiary_id: purchase.value.subsidiary_id,
    warehouse_id: purchase.value.warehouse_id,
  };
  purchase.value.date = moment(purchase.value.date).format("YYYY-MM-DD HH:mm");
  purchase.value.access_key = "test-2";
  purchase.value.invoice = "123-123-1231238888";

  console.log(purchase.value);

  savePurchaseFromXMLMutations.mutate(purchase.value);
};

watch(savePurchaseFromXMLMutations.isError, () => {
  if (savePurchaseFromXMLMutations.isError.value) {
    let x = savePurchaseFromXMLMutations.error.value as AxiosError;
    props.purchase.products = productsS;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(savePurchaseFromXMLMutations.isSuccess, () => {
  if (savePurchaseFromXMLMutations.isSuccess.value) {
    alert("OK");
  }
});
</script>

<template>
  <div class="tw-h-full tw-bg-white">
    <v-toolbar dark color="primary" density="compact">
      <div class="tw-flex tw-w-full tw-justify-between tw-px-3">
        <div class="tw-flex tw-items-center tw-gap-3">
          <v-btn icon dark @click="emits('close')" color="secondary">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <h1>
            {{ step == 1 ? "Comprobar productos" : "Verificar Resumen" }}
          </h1>
        </div>
        <div class="">
          <VBtn v-if="step == 1" @click="next">
            <div
              class="tw-flex tw-text-white tw-gap-1 tw-justify-center tw-items-center"
            >
              <p>Siguiente</p>
              <Icon
                icon="material-symbols:arrow-right-alt"
                height="16"
                class="tw-mt-1"
              />
            </div>
          </VBtn>
          <VBtn v-else @click="back">
            <div
              class="tw-flex tw-text-white tw-gap-1 tw-justify-center tw-items-center"
            >
              <Icon
                icon="material-symbols:arrow-left-alt"
                height="16"
                class="tw-mt-1"
              />
              <p>Atras</p>
            </div>
          </VBtn>
        </div>
      </div>
    </v-toolbar>
    <VWindow v-model="step" class="tw-h-full">
      <VWindowItem :value="1" class="tw-h-full">
        <div class="tw-flex tw-p-6 tw-flex-col tw-gap-10">
          <VSelect
            placeholder="Bodega"
            :items="wareHouses"
            item-title="name"
            item-value="id"
            :loading="isWareHousesLoading"
            v-model="purchase.warehouse_id"
          />
          <v-table
            height="300px"
            density="compact"
            class="tw-w-full"
            fixed-header
          >
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Asociado</th>
                <th class="text-left">es gasto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in props.purchase.products">
                <td>{{ item.name }}</td>
                <td style="width: 340px">
                  <v-autocomplete
                    placeholder="Producto asociado"
                    hide-details
                    :items="products"
                    :loading="isProductsLoading"
                    item-title="name"
                    return-object
                    clearable
                    v-model="item.asociatedProduct"
                  ></v-autocomplete>
                </td>
                <td style="width: 140px">
                  <v-checkbox
                    label="Es gasto"
                    hide-details
                    v-model="item.spent"
                  ></v-checkbox>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </VWindowItem>
      <VWindowItem :value="2" class="tw-h-full">
        <div
          class="tw-h-full tw-flex tw-items-center tw-justify-center tw-px-6 tw-gap-44 tw-flex-col"
        >
          <v-table
            height="300px"
            density="compact"
            class="tw-w-full"
            fixed-header
          >
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">estado</th>
                <th class="text-left">es gasto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in mutableProducts">
                <td>
                  <p v-if="item.asociatedProduct" class="tw-ml-5">
                    {{ item.name }}
                  </p>
                  <VTextField
                    v-else
                    hide-details
                    focused
                    v-model="item.name"
                    placeholder="nombre del producto"
                  />
                </td>
                <td>
                  {{
                    item.asociatedProduct
                      ? item.asociatedProduct.name
                      : "Para crear"
                  }}
                </td>
                <td>{{ item.spent ? "si" : "No" }}</td>
              </tr>
            </tbody>
          </v-table>
          <VBtn
            @click="onPurchaseSubmit"
            :loading="savePurchaseFromXMLMutations.isPending.value"
            >Guardar</VBtn
          >
        </div>
      </VWindowItem>
    </VWindow>
  </div>
</template>

<style scoped></style>
