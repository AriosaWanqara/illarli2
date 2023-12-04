<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useTaxe from "../../composables/taxe/useTaxe";
import useTaxesMutations from "../../composables/taxe/useTaxesMutations";
import useTaxesRules from "../../composables/taxe/useTaxesRules";

const { taxesRules } = useTaxesRules();
const router = useRouter();
const params = useRoute().params;
const { isTaxeLoading, taxe, taxeHasError } = useTaxe(params.id.toString());
const taxeToSave = ref(taxe);
const taxeValidator = useVuelidate(taxesRules, taxeToSave);
const { updateTaxeMutations } = useTaxesMutations();

const onTaxeSubmit = () => {
  taxeValidator.value.$validate();
  if (!taxeValidator.value.$error) {
    updateTaxeMutations.mutate(taxeToSave.value);
  } else {
    alert(JSON.stringify(taxeValidator.value.$errors.map((x) => x.$property)));
  }
};

watch(updateTaxeMutations.isError, () => {
  if (updateTaxeMutations.isError.value) {
    let x = updateTaxeMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateTaxeMutations.isSuccess, () => {
  if (updateTaxeMutations.isSuccess.value) {
    router.push({ name: "product-taxes-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear tarifa">
    <template #actionBack>
      <RouterLink :to="{ name: 'product-taxes-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-1" v-if="isTaxeLoading">
        <VCol cols="12">
          <p>cargando</p>
        </VCol>
        <VCol cols="12">
          <VBtn color="primary">crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="taxeHasError">
        <VCol cols="6">
          <p>error</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="6">
          <VTextField label="Nombre" v-model="taxeToSave.name" />
        </VCol>
        <VCol cols="12">
          <VBtn
            color="primary"
            @click="onTaxeSubmit"
            :loading="updateTaxeMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
