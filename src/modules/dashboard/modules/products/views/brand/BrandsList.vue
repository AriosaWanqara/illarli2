<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useBrandsMutations from "../../composables/brand/useBrandsMutations";
import { watch } from "vue";
import useBrands from "../../composables/brand/useBrands";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

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
const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];
</script>

<template>
  <ViewScaffold title="Marcas">
    <template #action>
      <RouterLink :to="{ name: 'product-brands-add' }">
        <v-btn flat color="success">Agregar</v-btn>
      </RouterLink>
    </template>
    <template #default>
      <div>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="brands"
          :loading="isBrandsLoading"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{
                    name: 'product-brands-update',
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
                  :loading="deleteBrandMutation.isPending.value"
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
