<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import { useUserStore } from "@/stores/userStore";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useWareHouses from "../../../config/composables/warehouse/useWareHouses";
import useProducts from "../../../products/composables/product/useProducts";
import type { Product } from "../../../products/models/products/Product";
import useTransferenceMutations from "../../composables/transference/useTransferenceMutations";
import type { Transference } from "../../models/Transference";
import moment from "moment";

const { wareHouses, isWareHousesLoading } = useWareHouses();
const { user } = useUserStore();
const { saveTransferenceMutations } = useTransferenceMutations();
const { isProductsLoading, products } = useProducts();
const selectedProducts = ref<Product[]>([]);
const selectedProductsNotReadOnly = ref<Product[]>([]);
const transference = ref<Transference>({} as Transference);
const router = useRouter();

const onTransferenceSubmit = () => {
  transference.value.sender_user_id = user.id;
  transference.value.details = [];
  transference.value.items = selectedProductsNotReadOnly.value.length;
  transference.value.shipping_date = moment(new Date()).format(
    "DD-MM-YYYY HH:mm"
  );
  selectedProductsNotReadOnly.value.map((x) => {
    transference.value.details.push({
      order_amount: x.amount,
      amount: x.amount,
      product: x,
      unit_price: parseFloat(x.price),
    });
  });
  saveTransferenceMutations.mutate(transference.value);
};

watch(selectedProducts, () => {
  selectedProductsNotReadOnly.value = [];
  selectedProducts.value.map((x) => {
    selectedProductsNotReadOnly.value.push({ ...x, amount: 1 });
  });
});

watch(saveTransferenceMutations.isError, () => {
  if (saveTransferenceMutations.isError.value) {
    let x = saveTransferenceMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveTransferenceMutations.isSuccess, () => {
  if (saveTransferenceMutations.isSuccess.value) {
    router.push({ name: "transference-list" });
  }
});
</script>

<template>
  <UIScaffold title="Transferencias">
    <template #left-action>Crear Transferencias </template>
    <template #right-action>
      <RouterLink :to="{ name: 'transference-list' }">
        <VBtn> Back </VBtn>
      </RouterLink>
    </template>
    <template #default>
      <VRow>
        <VCol cols="6">
          <VSelect
            item-title="name"
            :items="wareHouses"
            v-model="transference.shipping_warehouse_id"
            label="bodega origen"
            item-value="id"
            :loading="isWareHousesLoading"
          ></VSelect>
        </VCol>
        <VCol cols="6">
          <VSelect
            item-title="name"
            :items="wareHouses"
            label="bodega destino"
            item-value="id"
            v-model="transference.reception_warehouse_id"
            :loading="isWareHousesLoading"
          ></VSelect>
        </VCol>
        <VCol cols="12" class="py-0">
          <VTextField label="Descripcion" v-model="transference.observation" />
        </VCol>
        <VCol cols="12" class="py-0">
          <VSelect
            label="Products"
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
          <VBtn
            @click="onTransferenceSubmit"
            :loading="saveTransferenceMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
