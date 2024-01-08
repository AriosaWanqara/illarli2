<script setup lang="ts">
import { ref } from "vue";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";
import useWareHouseTypes from "../../composables/warehouse/useWareHouseTypes";
import type { WareHouse } from "../../models/WareHouse";
import useWareHouseRules from "../../composables/warehouse/useWareHouseRules";
import useVuelidate from "@vuelidate/core";

interface props {
  isLoading: boolean;
  wareHouse: WareHouse;
  formButtonText: string;
}

const props = defineProps<props>();
const emits = defineEmits(["submit-warehouse"]);

const { isWareHouseTypesLoading, wareHouseTypes } = useWareHouseTypes();
const { isSubsidiariesLoading, subsidiaryDropdown } = useSubsidiaries();

const onWareHouseSubmit = () => {
  const { wareHouseRules } = useWareHouseRules();
  const whareHouseValidator = useVuelidate(wareHouseRules, props.wareHouse);
  whareHouseValidator.value.$validate();
  if (!whareHouseValidator.value.$error) {
    emits("submit-warehouse", props.wareHouse);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400">
          Tipo de bodega</label
        >
        <VSelect
          :items="wareHouseTypes"
          item-title="name"
          :loading="isWareHouseTypesLoading"
          placeholder="Tipo"
          item-value="id"
          v-model="props.wareHouse.warehouse_type_id"
        >
          <template #selection="{ index, item }" v-if="isWareHouseTypesLoading">
            <p>Cargando...</p>
          </template>
        </VSelect>
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400">
          Nombre de la bodega</label
        >

        <VTextField label="nombre" v-model="props.wareHouse.name" />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400">
          Codigo de bodega</label
        >

        <VTextField label="code" v-model="props.wareHouse.code" />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400">
          Direccion de bodega</label
        >
        <VTextField label="address" v-model="props.wareHouse.address" />
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold tw-text-gray-400">
          Sucursal de bodega</label
        >
        <VSelect
          label="subsidiary"
          :loading="isSubsidiariesLoading"
          v-model="props.wareHouse.subsidiary_id"
          :items="subsidiaryDropdown"
          item-title="label"
          item-value="value"
        >
          <template #selection="{ index, item }" v-if="isSubsidiariesLoading">
            <p>Cargando...</p>
          </template>
        </VSelect>
      </div>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-justify-end">
        <VBtn
          color="info"
          @click="onWareHouseSubmit"
          :prepend-icon="
            props.wareHouse.id ? 'mdi-content-save-outline' : 'mdi-plus'
          "
          :loading="isLoading"
          variant="elevated"
          >{{ formButtonText }}</VBtn
        >
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
