<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useBrandsMutations from "../../composables/brand/useBrandsMutations";
import { watch } from "vue";
import useBrands from "../../composables/brand/useBrands";

const { deleteBrandMutation } = useBrandsMutations();
const { brands, brandsHasError, isBrandsLoading } = useBrands();

const onDelete = (id: string) => {
  deleteBrandMutation.mutate(id);
};

watch(deleteBrandMutation.isError, () => {
  if (deleteBrandMutation.isError.value) {
    alert("bad");
  }
});
watch(deleteBrandMutation.isSuccess, () => {
  if (deleteBrandMutation.isSuccess.value) {
    brands.value = brands.value.filter(
      (x) => x.id != deleteBrandMutation.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold title="Marcas">
    <template #action>
      <RouterLink :to="{ name: 'product-brands-add' }">
        <v-btn flat color="success">Agregar</v-btn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isBrandsLoading">cargando..</p>
      <p v-else-if="brandsHasError">error</p>
      <div v-else v-for="brand in brands">
        {{ brand.id }}
        {{ brand.name }}
        <RouterLink
          :to="{ name: 'product-brands-update', params: { id: brand.id } }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn @click="onDelete(brand.id)">Eliminar</VBtn>
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
