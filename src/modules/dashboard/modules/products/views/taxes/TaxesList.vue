<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import useTaxes from "../../composables/taxe/useTaxes";
import useTaxesMutations from "../../composables/taxe/useTaxesMutations";

const { deleteTaxeMutations } = useTaxesMutations();
const { isTaxesLoading, taxes, taxesHasError } = useTaxes();

const onDelete = (id: string) => {
  deleteTaxeMutations.mutate(id);
};

watch(deleteTaxeMutations.isError, () => {
  if (deleteTaxeMutations.isError.value) {
    let x = deleteTaxeMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(deleteTaxeMutations.isSuccess, () => {
  if (deleteTaxeMutations.isSuccess.value) {
    taxes.value = taxes.value.filter(
      (x) => x.id != deleteTaxeMutations.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold title="Tarifas">
    <template #action>
      <RouterLink :to="{ name: 'product-taxes-add' }">
        <v-btn color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isTaxesLoading">cargando..</p>
      <p v-else-if="taxesHasError">error</p>
      <div v-else v-for="taxe in taxes">
        {{ taxe.name }}
        <RouterLink
          :to="{ name: 'product-category-update', params: { id: taxe.id } }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(taxe.id)"
          :loading="deleteTaxeMutations.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
