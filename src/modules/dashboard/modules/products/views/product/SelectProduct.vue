<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";

const ProductType = ref([
  {
    label: "Estandar",
    to: "",
    icon: "",
  },
  {
    label: "Serie",
    to: "",
    icon: "",
  },
  {
    label: "Combo",
    to: "",
    icon: "",
  },
  {
    label: "Combo",
    to: "",
    icon: "",
  },
  {
    label: "Combo",
    to: "",
    icon: "",
  },
]);
</script>

<template>
  <ViewScaffold title="Tipo de Producto">
    <template v-slot:action>
      <RouterLink :to="{ name: 'product-list' }">
        <v-btn flat color="primary" variant="outlined"
          ><ArrowBackIcon size="18" class="mr-2" />Atras</v-btn
        >
      </RouterLink>
    </template>

    <VRow>
      <VCol cols="12" md="4" lg="3" v-for="item in ProductType">
        <VCard elevation="10" class="text-center">
          <v-card-item>
            {{ item.label }}
          </v-card-item>
        </VCard>
      </VCol>
    </VRow>
  </ViewScaffold>
</template>

<style scoped></style>
