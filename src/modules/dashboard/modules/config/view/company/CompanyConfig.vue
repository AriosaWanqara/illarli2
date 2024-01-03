<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCompany from "../../composables/company/useCompany";
import useCompanyConfigsMutations from "../../composables/company/useCompanyConfigsMutations";
import { watch } from "vue";
import type { AxiosError } from "axios";

const {
  companyConfigs,
  companyConfigsHasError,
  isCompanyConfigsLoading,
  staleData,
} = useCompany();
const { updateCompanyConfigsMutations } = useCompanyConfigsMutations();

const onUpdateConfig = () => {
  updateCompanyConfigsMutations.mutate(companyConfigs.value);
};

watch(updateCompanyConfigsMutations.isError, () => {
  if (updateCompanyConfigsMutations.isError.value) {
    let x = updateCompanyConfigsMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
    companyConfigs.value = staleData.value!;
  }
});

watch(updateCompanyConfigsMutations.isSuccess, () => {
  if (updateCompanyConfigsMutations.isSuccess.value) {
    alert("gut");
  }
});
</script>

<template>
  <ViewScaffold title="Configuracion">
    <!-- <VRow v-if="isCompanyConfigsLoading">
      <p>cargando..</p>
    </VRow>
    <VRow v-else-if="companyConfigsHasError">
      <p>cargando..</p>
    </VRow>
    <VRow v-else>
      <VRow class="mt-1">
        <VCol cols="12" md="3"
          ><v-checkbox
            :true-value="1"
            :false-value="0"
            label="cashdrawer opening"
            v-model="companyConfigs.is_active_drawer_opening"
          ></v-checkbox
        ></VCol>
        <VCol cols="12" md="3"
          ><v-checkbox
            :true-value="1"
            :false-value="0"
            label="inventory managment"
            v-model="companyConfigs.is_active_inventory_managment"
          ></v-checkbox
        ></VCol>
        <VCol cols="12" md="3"
          ><v-checkbox
            :true-value="1"
            :false-value="0"
            label="search product match"
            v-model="companyConfigs.is_active_search_products_match"
          ></v-checkbox
        ></VCol>
        <VCol cols="12" md="3"
          ><v-checkbox
            label="search product observation"
            v-model="companyConfigs.is_active_search_products_observation"
          ></v-checkbox
        ></VCol>
      </VRow>
      <VDivider></VDivider>
      <VRow class="mt-1">
        <VCol cols="12"
          ><v-checkbox
            label="code as a default search"
            v-model="companyConfigs.is_active_search_products_code_dafault"
          ></v-checkbox
        ></VCol>
        <VCol cols="12">
          <VBtn @click="onUpdateConfig"> Crear </VBtn>
        </VCol>
      </VRow>
    </VRow> -->
  </ViewScaffold>
</template>

<style scoped></style>
