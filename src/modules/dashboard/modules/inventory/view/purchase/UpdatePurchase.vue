<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import { useRoute, useRouter } from "vue-router";
import usePurchaseOrder from "../../composables/purchase/usePurchaseOrder";
import usePurchaseOrderMutations from "../../composables/purchase/usePurchaseOrderMutations";
import useReceptionMutations from "../../composables/reception/useReceptionMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import type { PurchaseOrderReception } from "../../models/PurchaseOrderReception";
import type {
  PurchaseOrderToSave,
  PurchaseToSave,
} from "../../models/PurchaseOrder";
import usePurchaseMutations from "../../composables/purchase/usePurchaseMutations";

const params = useRoute().params;

const { isPurchaseLoading, purchase, purchaseHasError, stalesPurchase } =
  usePurchaseOrder(params.id.toString());
const { savePurchaseMutations } = usePurchaseMutations();
const { updatePurchaseMutations } = usePurchaseOrderMutations();
const { saveReceptionMutations } = useReceptionMutations();

const ensureMaxValue = (
  $event: any,
  order_amount: number,
  receive_amount: number,
  amount: number,
  index: number
) => {
  if (amount > order_amount - receive_amount) {
    purchase.value.details![index].amount = order_amount - receive_amount;
    $event.preventDefault();
  }
};

const onPurchaseSubmit = () => {
  let newPurchase: PurchaseOrderToSave = {
    id: purchase.value.id,
    user_id: purchase.value.user_id,
    details: [],
  };
  purchase.value.details?.map((x) => {
    if (x.amount! > 0) {
      newPurchase.details?.push({
        observation: x.observation,
        id: x.id,
        amount: x.amount,
        order_amount: x.order_amount,
        product: x.product,
        unit_price: x.unit_price,
        receive_amount:
          parseFloat(x.amount!.toString()) +
          parseFloat(x.receive_amount!.toString()),
      });
    }
  });
  updatePurchaseMutations.mutate(newPurchase);
};

watch(updatePurchaseMutations.isError, () => {
  if (updatePurchaseMutations.isError.value) {
    let x = updatePurchaseMutations.error.value as AxiosError;
    purchase.value = { ...stalesPurchase.value };
    alert(x);
  }
});
watch(updatePurchaseMutations.isSuccess, () => {
  if (updatePurchaseMutations.isSuccess.value) {
    if (updatePurchaseMutations.data.value) {
      if (
        updatePurchaseMutations.data.value.details!.every(
          (x) => x.receive_amount! <= x.order_amount
        )
      ) {
        let purchase: PurchaseToSave = {
          ...updatePurchaseMutations.data.value,
          details: [],
        };
        updatePurchaseMutations.data.value.details?.map((x) => {
          purchase.details!.push({
            order_amount: x.order_amount,
            unit_price: x.unit_price,
            observation: x.observation,
            product: x.product,
          });
        });
        delete purchase.status;
        savePurchaseMutations.mutate(purchase);
      }
    }
    let reception: Partial<PurchaseOrderReception> = {
      purchase_order_id: purchase.value.id,
      details: [],
    };
    purchase.value.details?.map((x) => {
      reception.details?.push({
        id: x.id!,
        receive_amount: x.amount!,
      });
      x.missing_amount! -= parseFloat(x.amount!.toString());
      x.receive_amount =
        parseFloat(x.amount!.toString()) +
        parseFloat(x.receive_amount!.toString());
      x.amount = 0;
    });
    saveReceptionMutations.mutate(reception);
    stalesPurchase.value = { ...purchase.value };
  }
});
watch(saveReceptionMutations.isError, () => {
  if (saveReceptionMutations.isError.value) {
    let x = saveReceptionMutations.error.value as AxiosError;
    alert(x);
  }
});
watch(saveReceptionMutations.isSuccess, () => {
  if (saveReceptionMutations.isSuccess.value) {
  }
});

watch(savePurchaseMutations.isError, () => {
  if (savePurchaseMutations.isError.value) {
    let x = savePurchaseMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(savePurchaseMutations.isSuccess, () => {
  if (savePurchaseMutations.isSuccess.value) {
    alert("Compra guardada");
  }
});
</script>

<template>
  <UIScaffold title="Compras">
    <template #left-action>
      <h1>Actualizar Compras</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'purchase-order-list' }">
        <VBtn color="success">back</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isPurchaseLoading">cargando</p>
      <p v-else-if="purchaseHasError">error</p>
      <VRow v-else>
        <VCol cols="12">
          <v-table fixed-header>
            <thead class="table-head">
              <tr>
                <th class="text-left font-weight-black"><p>Nombre</p></th>
                <th class="text-left font-weight-black"><p>Precio</p></th>
                <th class="text-left font-weight-black"><p>Total</p></th>
                <th class="text-left font-weight-black">
                  <p>Cant. pedida</p>
                </th>
                <th class="text-left font-weight-black">
                  <p>Cant. a recibir</p>
                </th>
                <th class="text-left font-weight-black">
                  <p>Cant. faltante</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <TransitionGroup name="fade">
                <tr
                  v-for="(data, index) in purchase.details"
                  :key="data.product.id"
                >
                  <td>{{ data.product.name }}</td>
                  <td>{{ data.product.price }}</td>
                  <td>
                    {{
                      (
                        parseFloat(data.product.price) * data.order_amount
                      ).toFixed(2)
                    }}
                  </td>
                  <td>{{ data.order_amount }}</td>
                  <td>
                    <VTextField
                      v-model="data.amount"
                      type="number"
                      :max="data.order_amount - data.receive_amount!"
                      @input="
                        ensureMaxValue(
                          $event,
                          data.order_amount,
                          data.receive_amount!,
                          data.amount!,
                          index
                        )
                      "
                    />
                  </td>
                  <td>
                    {{ data.missing_amount }}
                  </td>
                </tr>
              </TransitionGroup>
            </tbody>
          </v-table>
        </VCol>
        <VCol cols="12">
          <VBtn
            @click="onPurchaseSubmit"
            :loading="
              updatePurchaseMutations.isPending.value ||
              saveReceptionMutations.isPending.value
            "
          >
            crear
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
