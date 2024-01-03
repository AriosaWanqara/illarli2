<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateBrandForm from "../../component/brand/createBrandForm.vue";
import useBrand from "../../composables/brand/useBrand";
import useBrandsMutations from "../../composables/brand/useBrandsMutations";
import type { Brand } from "../../models/Brand";

const { updateBrandMutation } = useBrandsMutations();
const params = useRoute().params;
const { brand, brandHasError, isBrandLoading, brandError } = useBrand(
  params.id.toString()
);
const router = useRouter();
const error = ref<AxiosError<{ message: string; errors: string[] }>>(
  brandError.value as AxiosError<{ message: string; errors: string[] }>
);

const onBrandSubmit = (brandToSave: Brand) => {
  updateBrandMutation.mutate(brandToSave);
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
      <CreateBrandForm
        v-else
        :brand="brand"
        :isLoading="updateBrandMutation.isPending.value"
        @submit-brand="onBrandSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
