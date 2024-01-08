<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CreateWareHouseForm from "../../component/warehouse/createWareHouseForm.vue";
import useWareHousesMutations from "../../composables/warehouse/useWareHousesMutations";
import type { WareHouse } from "../../models/WareHouse";

const { saveWareHouseMutation } = useWareHousesMutations();
const wareHouse = ref<WareHouse>({} as WareHouse);
const router = useRouter();

const onWareHouseSubmit = (wareHouseToSave: WareHouse) => {
  saveWareHouseMutation.mutate(wareHouseToSave);
};

watch(saveWareHouseMutation.isError, () => {
  if (saveWareHouseMutation.isError.value) {
    alert("bad");
  }
});

watch(saveWareHouseMutation.isSuccess, () => {
  if (saveWareHouseMutation.isSuccess.value) {
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
      <CreateWareHouseForm
        :ware-house="wareHouse"
        :form-button-text="'Añadir Bodega'"
        :is-loading="saveWareHouseMutation.isPending.value"
        @submit-warehouse="onWareHouseSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
