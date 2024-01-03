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
}

const { wareHouse } = defineProps<props>();
const emits = defineEmits(["submit-warehouse"]);
const wareHouseToSave = ref({ ...wareHouse });

const { isWareHouseTypesLoading, wareHouseTypes } = useWareHouseTypes();
const { isSubsidiariesLoading, subsidiaryDropdown } = useSubsidiaries();
const { wareHouseRules } = useWareHouseRules();
const whareHouseValidator = useVuelidate(wareHouseRules, wareHouseToSave);

const onWareHouseSubmit = () => {
  whareHouseValidator.value.$validate();
  if (!whareHouseValidator.value.$error) {
    emits("submit-warehouse", wareHouseToSave.value);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12" class="py-0 tw-mb-4">
      <VDivider></VDivider>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Tipo de bodega</label>
        <VSelect
          :items="wareHouseTypes"
          item-title="name"
          :loading="isWareHouseTypesLoading"
          placeholder="Tipo"
          item-value="id"
          v-model="wareHouseToSave.warehouse_type_id"
        >
          <template #selection="{ index, item }" v-if="isWareHouseTypesLoading">
            <p>Cargando...</p>
          </template>
        </VSelect>
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Nombre de la bodega</label>

        <VTextField label="nombre" v-model="wareHouseToSave.name" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Codigo de bodega</label>

        <VTextField label="code" v-model="wareHouseToSave.code" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Direccion de bodega</label>
        <VTextField label="address" v-model="wareHouseToSave.address" />
      </div>
    </VCol>
    <VCol cols="12" md="6" class="py-0">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label for="" class="tw-font-semibold"> Sucursal de bodega</label>
        <VSelect
          label="subsidiary"
          :loading="isSubsidiariesLoading"
          v-model="wareHouseToSave.subsidiary_id"
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
    <VCol cols="12" class="py-1">
      <VBtn color="primary" @click="onWareHouseSubmit" :loading="isLoading"
        >Crear</VBtn
      >
    </VCol>
  </VRow>
</template>

<style scoped></style>
