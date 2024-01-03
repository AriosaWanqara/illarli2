<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CreateCashDrawerForm from "../../component/cashdrawer/createCashDrawerForm.vue";
import useCashdrawersMutations from "../../composables/cashdrawer/useCashdrawersMutations";
import type { Cashdrawer } from "../../models/Cashdrawer";

const { saveCashdrawerMutations } = useCashdrawersMutations();

const router = useRouter();
const cashdrawer = ref<Cashdrawer>({} as Cashdrawer);

const onCashDrawerSubmit = (cashdrawerToSave: Cashdrawer) => {
  saveCashdrawerMutations.mutate(cashdrawerToSave);
};

watch(saveCashdrawerMutations.isError, () => {
  if (saveCashdrawerMutations.isError.value) {
    let x = saveCashdrawerMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveCashdrawerMutations.isSuccess, () => {
  if (saveCashdrawerMutations.isSuccess.value) {
    router.push({ name: "config-cashdrawer-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear caja">
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
      <CreateCashDrawerForm
        :cashdrawer="cashdrawer"
        :is-loading="saveCashdrawerMutations.isPending.value"
        @submit-cashdrawer="onCashDrawerSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
