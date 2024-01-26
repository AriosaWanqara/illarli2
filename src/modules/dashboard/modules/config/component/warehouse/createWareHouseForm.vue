<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";
import useWareHouseRules from "../../composables/warehouse/useWareHouseRules";
import useWareHouseTypes from "../../composables/warehouse/useWareHouseTypes";
import type { WareHouse } from "../../models/WareHouse";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

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
      <InputSection label-message="Tipo de bodega" required>
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
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Nombre de la bodega" required>
        <VTextField label="nombre" v-model="props.wareHouse.name" />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Codigo de bodega">
        <VTextField label="code" v-model="props.wareHouse.code" />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Direccion de bodega">
        <VTextField label="address" v-model="props.wareHouse.address" />
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <InputSection label-message="Sucursal de bodega" required>
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
      </InputSection>
    </VCol>
    <VCol cols="12" class="py-0">
      <div class="tw-flex tw-justify-end">
        <VBtn
          color="info"
          density="default"
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
