<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useSubsidiaryRules from "../../composables/subsidiary/useSubsidiaryRules";
import { ref } from "vue";
import type { Subsidiary } from "../../models/Subsidiary";
import { useVuelidate } from "@vuelidate/core";
import useSubsidiariesMutations from "../../composables/subsidiary/useSubsidiariesMutations";
import { watch } from "vue";
import { useRouter } from "vue-router";
import type { AxiosError } from "axios";

const { subsidiaryRules } = useSubsidiaryRules();
const brand = ref<Subsidiary>({} as Subsidiary);
const subsidiaryValidator = useVuelidate(subsidiaryRules, brand);
const { saveSubsidiaryMutations } = useSubsidiariesMutations();
const router = useRouter();

const onSubsidiarySubmit = () => {
  subsidiaryValidator.value.$validate();
  if (!subsidiaryValidator.value.$error) {
    saveSubsidiaryMutations.mutate(brand.value);
  } else {
    alert(
      JSON.stringify(subsidiaryValidator.value.$errors.map((x) => x.$property))
    );
  }
};

watch(saveSubsidiaryMutations.isError, () => {
  if (saveSubsidiaryMutations.isError.value) {
    let x = saveSubsidiaryMutations.error.value as AxiosError;
    alert(x.response?.data);
  }
});
watch(saveSubsidiaryMutations.isSuccess, () => {
  if (saveSubsidiaryMutations.isSuccess.value) {
    router.push({ name: "config-subsidiaries-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Crear sucursal">
    <template #actionBack>
      <RouterLink :to="{ name: 'config-subsidiaries-list' }">
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
        <VCol cols="12" class="py-0 tw-mb-4">
          <VDivider></VDivider>
        </VCol>
        <VCol cols="12" md="6" class="py-0">
          <div class="tw-flex tw-flex-col tw-gap-1">
            <label for="" class="tw-font-semibold"> Nombre comercial*</label>
            <VTextField
              placeholder="business name"
              v-model="brand.businessname"
            />
          </div>
        </VCol>
        <VCol cols="12" md="6" class="py-0">
          <div class="tw-flex tw-flex-col tw-gap-1">
            <label for="" class="tw-font-semibold">
              Direccion de la sucursal*</label
            >

            <VTextField placeholder="address" v-model="brand.address" />
          </div>
        </VCol>
        <VCol cols="12" md="6" class="py-0">
          <div class="tw-flex tw-flex-col tw-gap-1">
            <label for="" class="tw-font-semibold">
              Telefono de la sucursal</label
            >

            <VTextField placeholder="phone" v-model="brand.phone" />
          </div>
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onSubsidiarySubmit"
            :loading="saveSubsidiaryMutations.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
