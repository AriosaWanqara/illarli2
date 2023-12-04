<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useVuelidate from "@vuelidate/core";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useBrand from "../../composables/brand/useBrand";
import useBrandRules from "../../composables/brand/useBrandRules";
import useBrandsMutations from "../../composables/brand/useBrandsMutations";

const { updateBrandMutation } = useBrandsMutations();
const { brandRules } = useBrandRules();
const params = useRoute().params;
const { brand, brandHasError, isBrandLoading, brandError } = useBrand(
  params.id.toString()
);
const brandToSave = ref(brand);
const brandValidator = useVuelidate(brandRules, brandToSave);
const router = useRouter();
const error = ref<AxiosError<{ message: string; errors: string[] }>>(
  brandError.value as AxiosError<{ message: string; errors: string[] }>
);

const onBrandSubmit = () => {
  brandValidator.value.$validate();
  if (!brandValidator.value.$error) {
    updateBrandMutation.mutate(brandToSave.value);
  } else {
    alert(JSON.stringify(brandValidator.value.$errors.map((x) => x.$property)));
  }
};

watch(updateBrandMutation.isError, () => {
  if (updateBrandMutation.isError.value) {
  }
});
watch(updateBrandMutation.isSuccess, () => {
  if (updateBrandMutation.isSuccess.value) {
    router.push({ name: "product-brands-list" });
  }
});
</script>

<template>
  <ViewScaffold title="Actualizar marcas">
    <template #actionBack>
      <RouterLink :to="{ name: 'product-brands-list' }">
        <v-btn
          color="secondary"
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
        ></v-btn>
      </RouterLink>
    </template>
    <template #default>
      <VRow class="mt-1" v-if="isBrandLoading">
        <VCol cols="12" class="py-1"> cargando... </VCol>
        <VCol cols="12" class="py-1">
          <VBtn color="primary" @click="onBrandSubmit">Crear</VBtn>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else-if="brandHasError">
        <VCol cols="12" class="py-1">
          <p>{{ error }}</p>
        </VCol>
      </VRow>
      <VRow class="mt-1" v-else>
        <VCol cols="12" class="py-1">
          <VTextField label="nombre" v-model="brandToSave.name" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VTextField label="Observacion" v-model="brandToSave.observation" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onBrandSubmit"
            :loading="updateBrandMutation.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
