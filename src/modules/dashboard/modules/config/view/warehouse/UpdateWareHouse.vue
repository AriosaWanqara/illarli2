<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateWareHouseForm from "../../component/warehouse/createWareHouseForm.vue";
import useWareHouse from "../../composables/warehouse/useWareHouse";
import useWareHousesMutations from "../../composables/warehouse/useWareHousesMutations";
import type { WareHouse } from "../../models/WareHouse";

const router = useRouter();
const params = useRoute().params;
const { isWareHouseLoading, wareHouse, wareHouseHasError, wareHouseError } =
  useWareHouse(params.id.toString());

const { updateWareHouseMutation } = useWareHousesMutations();
const error = ref(wareHouseError.value as AxiosError);
const onWareHouseSubmit = (wareHouse: WareHouse) => {
  updateWareHouseMutation.mutate(wareHouse);
};

watch(updateWareHouseMutation.isError, () => {
  if (updateWareHouseMutation.isError.value) {
    let x = updateWareHouseMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateWareHouseMutation.isSuccess, () => {
  if (updateWareHouseMutation.isSuccess.value) {
    router.push({ name: "config-warehouses-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear bodega">
    <template #actionBack>
      <RouterLink :to="{ name: 'config-warehouses-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-1" v-if="isWareHouseLoading">
        <VCol cols="12" class="py-1">
          <p>cargando...</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="wareHouseHasError">
        <VCol cols="12" class="py-1">
          <p>{{ error }}</p>
        </VCol>
      </VRow>
      <CreateWareHouseForm
        v-else
        :ware-house="wareHouse"
        :form-button-text="'Actualizar Bodega'"
        :is-loading="updateWareHouseMutation.isPending.value"
        @submit-warehouse="onWareHouseSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
