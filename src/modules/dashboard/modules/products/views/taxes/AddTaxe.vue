<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useTaxesMutations from "../../composables/taxe/useTaxesMutations";
import useTaxesRules from "../../composables/taxe/useTaxesRules";
import type { Taxe } from "../../models/Taxe";

const { taxesRules } = useTaxesRules();
const router = useRouter();
const taxe = ref<Taxe>({} as Taxe);
const taxeValidator = useVuelidate(taxesRules, taxe);
const { saveTaxeMutations } = useTaxesMutations();

const onTaxeSubmit = () => {
  taxeValidator.value.$validate();
  if (!taxeValidator.value.$error) {
    saveTaxeMutations.mutate(taxe.value);
  } else {
    alert(JSON.stringify(taxeValidator.value.$errors.map((x) => x.$property)));
  }
};

watch(saveTaxeMutations.isError, () => {
  if (saveTaxeMutations.isError.value) {
    let x = saveTaxeMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(saveTaxeMutations.isSuccess, () => {
  if (saveTaxeMutations.isSuccess.value) {
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
      <VRow class="mt-1">
        <VCol cols="6">
          <VTextField label="Nombre" v-model="taxe.name" />
        </VCol>
        <VCol cols="12">
          <VBtn
            color="primary"
            @click="onTaxeSubmit"
            :loading="saveTaxeMutations.isPending.value"
            >crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
