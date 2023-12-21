<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import usePurchases from "../../composables/purchase/usePurchases";
import usePurchaseMutations from "../../composables/purchase/usePurchaseMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";
import type { Purchase } from "../../models/Purchase";
import type { PurchaseToSave } from "../../models/Purchase";
import { ref } from "vue";
import useReceptionMutations from "../../composables/reception/useReceptionMutations";

const { isPurchasesLoading, purchases, purchasesHasError, refetchPurchases } =
  usePurchases();
const { deletePurchaseMutations, updatePurchaseMutations } =
  usePurchaseMutations();

const { deleteReceptionMutations } = useReceptionMutations();
const showReceptionModal = ref(false);
const selectedPurchase = ref<Purchase>({} as Purchase);

const onDelete = (id: string) => {
  deletePurchaseMutations.mutate(id);
};

const onSelectedPurchase = (id: string) => {
  selectedPurchase.value = purchases.value.find((x) => x.id == id)!;
  showReceptionModal.value = true;
};

const onAcept = (purchase: Purchase) => {
  let newPurchase: PurchaseToSave = {
    status: "07",
    id: purchase.id,
    user_id: purchase.user_id,
  };
  updatePurchaseMutations.mutate(newPurchase);
};

watch(deletePurchaseMutations.isError, () => {
  if (deletePurchaseMutations.isError.value) {
    let x = deletePurchaseMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(deletePurchaseMutations.isSuccess, () => {
  if (deletePurchaseMutations.isSuccess.value) {
    purchases.value = purchases.value.filter(
      (x) => x.id != deletePurchaseMutations.variables.value
    );
  }
});
watch(updatePurchaseMutations.isError, () => {
  if (updatePurchaseMutations.isError.value) {
    let x = updatePurchaseMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updatePurchaseMutations.isSuccess, () => {
  if (updatePurchaseMutations.isSuccess.value) {
    refetchPurchases();
  }
});

const onDeleteReception = (id: string) => {
  deleteReceptionMutations.mutate(id);
};

watch(deleteReceptionMutations.isError, () => {
  if (deleteReceptionMutations.isError.value) {
    let x = deleteReceptionMutations.error.value as AxiosError;
    alert(JSON.stringify(x));
  }
});
watch(deleteReceptionMutations.isSuccess, () => {
  if (deleteReceptionMutations.isSuccess) {
    showReceptionModal.value = false;
  }
});
</script>

<template>
  <UIScaffold title="Compras">
    <template #left-action>
      <h1>Compras</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'purchase-add' }">
        <VBtn color="success">Agregar</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isPurchasesLoading">cargando..</p>
      <p v-else-if="purchasesHasError">error</p>
      <div v-else v-for="provider in purchases">
        {{ provider.status }}
        {{ provider.date }}
        <VBtn
          v-if="provider.status == 'REGISTRADO'"
          @click="onAcept(provider)"
          :loading="updatePurchaseMutations.isPending.value"
        >
          aprobar
        </VBtn>
        <RouterLink
          v-else
          :to="{ name: 'purchase-update', params: { id: provider.id } }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(provider.id)"
          v-if="provider.partials.length <= 0"
          :loading="deletePurchaseMutations.isPending.value"
          >Eliminar</VBtn
        >
        <VBtn v-else @click="onSelectedPurchase(provider.id)">
          eliminar recibo
        </VBtn>
        <br />
        <br />
      </div>
      <VDialog max-width="500" v-model="showReceptionModal">
        <VCard>
          <VCardText>
            <v-table fixed-header>
              <thead class="table-head">
                <tr>
                  <th class="text-left font-weight-black"><p>Fecha</p></th>
                  <th class="text-left font-weight-black"><p>Anular</p></th>
                </tr>
              </thead>
              <tbody>
                <TransitionGroup name="fade">
                  <tr
                    v-for="(data, index) in selectedPurchase.partials"
                    :key="data.id"
                  >
                    <td>
                      <p>{{ data.date }}</p>
                    </td>
                    <td>
                      <VBtn
                        @click="onDeleteReception(data.id)"
                        :loading="deleteReceptionMutations.isPending.value"
                      >
                        anular
                      </VBtn>
                    </td>
                  </tr>
                </TransitionGroup>
              </tbody>
            </v-table>
          </VCardText>
        </VCard>
      </VDialog>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
