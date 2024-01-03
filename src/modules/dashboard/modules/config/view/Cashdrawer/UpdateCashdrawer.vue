<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateCashDrawerForm from "../../component/cashdrawer/createCashDrawerForm.vue";
import useCashdrawer from "../../composables/cashdrawer/useCashdrawer";
import useCashdrawersMutations from "../../composables/cashdrawer/useCashdrawersMutations";
import type { Cashdrawer } from "../../models/Cashdrawer";

const { updateCashdrawerMutations } = useCashdrawersMutations();
const params = useRoute().params;
const router = useRouter();
const { cashdrawer, cashdrawerHasError, isCashdrawerLoading } = useCashdrawer(
  params.id.toString()
);

const onCashDrawerSubmit = (cashdrawerToSave: Cashdrawer) => {
  updateCashdrawerMutations.mutate(cashdrawerToSave);
};

watch(updateCashdrawerMutations.isError, () => {
  if (updateCashdrawerMutations.isError.value) {
    let x = updateCashdrawerMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateCashdrawerMutations.isSuccess, () => {
  if (updateCashdrawerMutations.isSuccess.value) {
    router.push({ name: "config-cashdrawer-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Caja">
    <template #actionBack>
      <RouterLink :to="{ name: 'config-cashdrawer-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>

    <template #default>
      <VRow class="mt-1" v-if="isCashdrawerLoading">
        <VCol cols="12">
          <p>Cargando..</p>
        </VCol>
        <VCol cols="12">
          <VBtn color="primary">crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="cashdrawerHasError">
        <VCol cols="12">
          <p>error..</p>
        </VCol>
      </VRow>
      <CreateCashDrawerForm
        v-else
        :cashdrawer="cashdrawer"
        :is-loading="updateCashdrawerMutations.isPending.value"
        @submit-cashdrawer="onCashDrawerSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
