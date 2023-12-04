<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { watch } from "vue";
import useWareHouses from "../../composables/warehouse/useWareHouses";
import useWareHousesMutations from "../../composables/warehouse/useWareHousesMutations";

const { wareHouses, isWareHousesLoading, wareHousesHasError } = useWareHouses();
const { deleteWareHouseMutation } = useWareHousesMutations();

const onDelete = (id: string) => {
  deleteWareHouseMutation.mutate(id);
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
  <ViewScaffold title="Bodegas">
    <template #action>
      <RouterLink :to="{ name: 'config-wharehouses-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isWareHousesLoading">cargando</p>
      <p v-else-if="wareHousesHasError">error</p>
      <div v-for="whareHouse in wareHouses" v-else>
        {{ whareHouse.id }}
        {{ whareHouse.name }}
        <RouterLink
          :to="{
            name: 'config-wharehouses-update',
            params: { id: whareHouse.id },
          }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(whareHouse.id)"
          :loading="deleteWareHouseMutation.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
