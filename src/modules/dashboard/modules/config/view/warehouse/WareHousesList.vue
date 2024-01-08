<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
import WareHouseTableList from "../../component/warehouse/WareHouseTableList.vue";
import useWareHouses from "../../composables/warehouse/useWareHouses";
import useWareHousesMutations from "../../composables/warehouse/useWareHousesMutations";
import type { WareHouse } from "../../models/WareHouse";
import { ref } from "vue";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";

const { wareHouses } = useWareHouses();
const { deleteWareHouseMutation } = useWareHousesMutations();
const router = useRouter();
const showConfirmDialog = ref(false);
const selectedWareHouse = ref<WareHouse>({} as WareHouse);

const onDelete = (wareHouse: WareHouse) => {
  selectedWareHouse.value = wareHouse;
  showConfirmDialog.value = true;
};

const onConfirmReponse = (response: boolean) => {
  if (response) {
    try {
      deleteWareHouseMutation.mutate(selectedWareHouse.value.id);
    } catch (error) {}
  }
  showConfirmDialog.value = false;
};

const onSelectWareHouse = (wareHouse: WareHouse) => {
  router.push({
    name: "config-warehouses-update",
    params: { id: wareHouse.id },
  });
};

watch(deleteWareHouseMutation.isError, () => {
  if (deleteWareHouseMutation.isError.value) {
    alert("bad");
  }
});

watch(deleteWareHouseMutation.isSuccess, () => {
  if (deleteWareHouseMutation.isSuccess.value) {
    wareHouses.value = wareHouses.value.filter(
      (x) => x.id != deleteWareHouseMutation.variables.value
    );
  }
});
</script>
<template>
  <ViewScaffold>
    <template #default>
      <div>
        <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
          <p class="tw-font-semibold tw-text-gray-400">Todas las bodegas</p>
          <RouterLink :to="{ name: 'config-warehouses-add' }">
            <v-btn flat color="success" prepend-icon="mdi-plus">Nueva</v-btn>
          </RouterLink>
        </div>
        <WareHouseTableList
          :is-delete-loading="deleteWareHouseMutation.isPending.value"
          :is-update-loading="false"
          @warehouse-delete="onDelete"
          @warehouse-update="onSelectWareHouse"
        />
        <ConfirmDeleteDialog
          :show-modal="showConfirmDialog"
          :title="'Desea borrar'"
          :dialog-text="'Esta seguro que desea borrar la bodega?'"
          @confirm-response="onConfirmReponse"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
