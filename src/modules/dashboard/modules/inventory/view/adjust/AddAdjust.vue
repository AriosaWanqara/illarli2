<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import { ref, watch } from "vue";
import useWareHouses from "../../../config/composables/warehouse/useWareHouses";
import useProducts from "../../../products/composables/product/useProducts";
import type { Product } from "../../../products/models/products/Product";
import useAdjustMutations from "../../composables/adjust/useAdjustMutations";
import type { Adjust } from "../../models/Adjust";
import { useUserStore } from "@/stores/userStore";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";

const { wareHouses, isWareHousesLoading } = useWareHouses();
const { user } = useUserStore();
const { isProductsLoading, products } = useProducts();
const selectedProducts = ref<Product[]>([]);
const selectedProductsNotReadOnly = ref<Product[]>([]);
const { saveAdjustMutations } = useAdjustMutations();
const adjust = ref<Adjust>({} as Adjust);
const router = useRouter();

watch(selectedProducts, () => {
  selectedProductsNotReadOnly.value = [];
  selectedProducts.value.map((x) => {
    selectedProductsNotReadOnly.value.push({ ...x, amount: 1 });
  });
});

const onInventorySubmit = () => {
  adjust.value.items = selectedProductsNotReadOnly.value.length;
  adjust.value.user_id = user.id;
  adjust.value.details = [];
  selectedProductsNotReadOnly.value.map((x) => {
    adjust.value.details.push({
      order_amount: x.amount,
      amount: x.active,
      product: x,
      unit_price: parseFloat(x.price),
    });
  });
  saveAdjustMutations.mutate(adjust.value);
};

watch(saveAdjustMutations.isError, () => {
  if (saveAdjustMutations.isError.value) {
    let x = saveAdjustMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(saveAdjustMutations.isSuccess, () => {
  if (saveAdjustMutations.isSuccess.value) {
    router.push({ name: "adjust-list" });
  }
});
</script>

<template>
  <UIScaffold>
    <template #left-action>
      <h1>Agregar Ajustes</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'adjust-list' }">
        <VBtn>back</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <VRow>
        <VCol cols="12">
          <VTextField label="Descripcion" v-model="adjust.reason" />
        </VCol>
        <VCol cols="12" class="py-0">
          <VSelect
            item-title="key"
            v-model="adjust.type"
            :items="[
              { key: 'Ingreso', value: '01' },
              { key: 'Egreso', value: '02' },
            ]"
            label="Type"
            item-value="value"
          ></VSelect>
        </VCol>
        <VCol cols="6" class="py-0">
          <VSelect
            item-title="name"
            v-model="adjust.warehouse_id"
            :items="wareHouses"
            label="bodega"
            item-value="id"
            :loading="isWareHousesLoading"
          ></VSelect>
        </VCol>
        <VCol cols="6" class="py-0">
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
            @click="onInventorySubmit"
            :loading="saveAdjustMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
