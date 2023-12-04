<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useWareHouse from "../../composables/warehouse/useWareHouse";
import useWareHouseRules from "../../composables/warehouse/useWareHouseRules";
import useWareHousesMutations from "../../composables/warehouse/useWareHousesMutations";
import type { AxiosError } from "axios";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";

const router = useRouter();
const params = useRoute().params;
const { isWareHouseLoading, wareHouse, wareHouseHasError, wareHouseError } =
  useWareHouse(params.id.toString());
const { isSubsidiariesLoading, subsidiaryDropdown, subsidiariesHasError } =
  useSubsidiaries();
const { wareHouseRules } = useWareHouseRules();
const { updateWareHouseMutation } = useWareHousesMutations();
const whareHouseToSave = ref(wareHouse);
const whareHouseValidator = useVuelidate(wareHouseRules, whareHouseToSave);
const error = ref(wareHouseError.value as AxiosError);
const onWhareHouseSubmit = () => {
  whareHouseValidator.value.$validate();
  if (!whareHouseValidator.value.$error) {
    updateWareHouseMutation.mutate(whareHouseToSave.value);
  }
};

watch(updateWareHouseMutation.isError, () => {
  if (updateWareHouseMutation.isError.value) {
    let x = updateWareHouseMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateWareHouseMutation.isSuccess, () => {
  if (updateWareHouseMutation.isSuccess.value) {
    router.push({ name: "config-wharehouses-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear bodega">
    <template #actionBack>
      <RouterLink :to="{ name: 'config-wharehouses-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-1" v-if="isWareHouseLoading">
        <VCol cols="12" class="py-1">
          <p>cargando...</p>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="wareHouseHasError">
        <VCol cols="12" class="py-1">
          <p>{{ error }}</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="12" class="py-1">
          <VTextField label="nombre" v-model="whareHouseToSave.name" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="nombre" v-model="whareHouseToSave.name" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="code" v-model="whareHouseToSave.code" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="address" v-model="whareHouseToSave.address" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            label="subsidiary"
            :loading="isSubsidiariesLoading"
            v-model="whareHouseToSave.subsidiary_id"
            :items="subsidiaryDropdown"
            item-title="label"
            item-value="value"
          />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onWhareHouseSubmit"
            :loading="updateWareHouseMutation.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
