<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCashdrawers from "../../composables/cashdrawer/useCashdrawers";
import useCashdrawersMutations from "../../composables/cashdrawer/useCashdrawersMutations";
import { watch } from "vue";

const { cashdrawers, cashdrawersHasError, isCashdrawersLoading } =
  useCashdrawers();
const { deleteCashdrawerMutations } = useCashdrawersMutations();

const onDelete = (id: string) => {
  deleteCashdrawerMutations.mutate(id);
};

watch(deleteCashdrawerMutations.isError, () => {
  if (deleteCashdrawerMutations.isError.value) {
    alert("bad");
  }
});

watch(deleteCashdrawerMutations.isSuccess, () => {
  if (deleteCashdrawerMutations.isSuccess.value) {
    cashdrawers.value = cashdrawers.value.filter(
      (x) => x.id != deleteCashdrawerMutations.variables.value
    );
  }
});
</script>
<template>
  <ViewScaffold title="Cajas">
    <template #action>
      <RouterLink :to="{ name: 'config-cashdrawer-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isCashdrawersLoading">cargando..</p>
      <p v-else-if="cashdrawersHasError">error</p>
      <div v-else v-for="cashdrawer in cashdrawers">
        {{ cashdrawer.id }}
        {{ cashdrawer.code }}
        <RouterLink
          :to="{
            name: 'config-cashdrawer-update',
            params: { id: cashdrawer.id },
          }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn @click="onDelete(cashdrawer.id)">Eliminar</VBtn>
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
