<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCashdrawers from "../../composables/cashdrawer/useCashdrawers";
import useCashdrawersMutations from "../../composables/cashdrawer/useCashdrawersMutations";
import { watch } from "vue";
import type { Header } from "vue3-easy-data-table";
import { Icon } from "@iconify/vue";

const { cashdrawers, cashdrawersHasError, isCashdrawersLoading } =
  useCashdrawers();
const { deleteCashdrawerMutations } = useCashdrawersMutations();

const onDelete = (id: string) => {
  deleteCashdrawerMutations.mutate(id);
};

const headers: Header[] = [
  { text: "Nombre", value: "code" },
  { text: "", value: "actions", width: 110 },
];

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
        <v-btn flat color="success">Agregar</v-btn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isCashdrawersLoading">cargando..</p>
      <p v-else-if="cashdrawersHasError">error</p>
      <div v-else>
        <EasyDataTable
          :headers="headers"
          :theme-color="'#f48225'"
          :items="cashdrawers"
          alternating
          class="customize-table"
        >
          <template #item-actions="item">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <RouterLink
                  :to="{
                    name: 'config-cashdrawer-update',
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
                  :loading="deleteCashdrawerMutations.isPending.value"
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
