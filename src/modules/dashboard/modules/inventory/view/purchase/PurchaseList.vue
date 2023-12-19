<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import usePurchases from "../../composables/purchase/usePurchases";
import usePurchaseMutations from "../../composables/purchase/usePurchaseMutations";

const { isPurchasesLoading, purchases, purchasesHasError } = usePurchases();
const { deletePurchaseMutations } = usePurchaseMutations();

const onDelete = (id: string) => {};
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
        {{ provider.id }}
        {{ provider.date }}
        <RouterLink
          :to="{ name: 'purchase-update', params: { id: provider.id } }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(provider.id)"
          :loading="deletePurchaseMutations.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
