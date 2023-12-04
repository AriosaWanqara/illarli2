<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { useVuelidate } from "@vuelidate/core";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useWareHouseRules from "../../composables/warehouse/useWareHouseRules";
import useWareHousesMutations from "../../composables/warehouse/useWareHousesMutations";
import type { WareHouse } from "../../models/WareHouse";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";

const { saveWareHouseMutation } = useWareHousesMutations();
const { wareHouseRules } = useWareHouseRules();
const { isSubsidiariesLoading, subsidiaryDropdown, subsidiariesHasError } =
  useSubsidiaries();
const whareHouse = ref<WareHouse>({} as WareHouse);
const whareHouseValidator = useVuelidate(wareHouseRules, whareHouse);
const router = useRouter();

const onWhareHouseSubmit = () => {
  whareHouseValidator.value.$validate();
  if (!whareHouseValidator.value.$error) {
    saveWareHouseMutation.mutate(whareHouse.value);
  } else {
    alert(
      JSON.stringify(whareHouseValidator.value.$errors.map((x) => x.$message))
    );
  }
};

watch(saveWareHouseMutation.isError, () => {
  if (saveWareHouseMutation.isError.value) {
    alert("bad");
  }
});

watch(saveWareHouseMutation.isSuccess, () => {
  if (saveWareHouseMutation.isSuccess.value) {
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
      <VRow class="mt-1">
        <VCol cols="6" class="py-1">
          <VTextField label="nombre" v-model="whareHouse.name" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="code" v-model="whareHouse.code" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VTextField label="address" v-model="whareHouse.address" />
        </VCol>
        <VCol cols="6" class="py-1">
          <VSelect
            label="subsidiary"
            :loading="isSubsidiariesLoading"
            v-model="whareHouse.subsidiary_id"
            :items="subsidiaryDropdown"
            item-title="label"
            item-value="value"
          />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onWhareHouseSubmit"
            :loading="saveWareHouseMutation.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
