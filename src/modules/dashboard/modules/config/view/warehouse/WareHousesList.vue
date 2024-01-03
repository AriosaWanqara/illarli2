<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { watch } from "vue";
import useWareHouses from "../../composables/warehouse/useWareHouses";
import useWareHousesMutations from "../../composables/warehouse/useWareHousesMutations";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

const { wareHouses, isWareHousesLoading, wareHousesHasError } = useWareHouses();
const { deleteWareHouseMutation } = useWareHousesMutations();

const onDelete = (id: string) => {
  deleteWareHouseMutation.mutate(id);
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];

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
  <ViewScaffold title="Bodegas">
    <template #action>
      <RouterLink :to="{ name: 'config-warehouses-add' }">
        <v-btn flat color="success">Agregar</v-btn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isWareHousesLoading">cargando</p>
      <p v-else-if="wareHousesHasError">error</p>
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="wareHouses"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{
                    name: 'config-warehouses-update',
                    params: { id: item.id },
                  }"
                >
                  <v-btn icon flat v-bind="props" variant="text">
                    <Icon icon="mdi:pencil" />
                  </v-btn>
                </RouterLink>
              </template>
            </v-tooltip>
            <v-tooltip text="Delete">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  flat
                  v-bind="props"
                  variant="text"
                  @click="onDelete(item.id)"
                  :loading="deleteWareHouseMutation.isPending.value"
                >
                  <Icon icon="mdi:trash-can-outline" />
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </EasyDataTable>
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
