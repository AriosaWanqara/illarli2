<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import createBrandFormVue from "../../component/brand/createBrandForm.vue";
import useBrandsMutations from "../../composables/brand/useBrandsMutations";
import type { Brand } from "../../models/Brand";

const { saveBrandMutation } = useBrandsMutations();
const brand = ref<Brand>({} as Brand);
const router = useRouter();

const onBrandSubmit = (brandToSave: Brand) => {
  saveBrandMutation.mutate(brandToSave);
};

watch(saveBrandMutation.isError, () => {
  if (saveBrandMutation.isError.value) {
    var x = saveBrandMutation.error.value as AxiosError<{
      message: string;
      errors: string[];
    }>;
    alert(JSON.stringify(x.response?.data));
  }
});
watch(saveBrandMutation.isSuccess, () => {
  if (saveBrandMutation.isSuccess.value) {
    router.push({ name: "product-brands-list" });
  }
});
</script>
<template>
  <ViewScaffold title="Crear marcas">
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
      <createBrandFormVue
        :brand="brand"
        :isLoading="saveBrandMutation.isPending.value"
        @submit-brand="onBrandSubmit"
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
