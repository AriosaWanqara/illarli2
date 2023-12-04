<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useBrandsMutations from "../../composables/brand/useBrandsMutations";
import { useVuelidate } from "@vuelidate/core";
import { ref, watch } from "vue";
import type { Brand } from "../../models/Brand";
import useBrandRules from "@dashboard/modules/products/composables/brand/useBrandRules";
import { useRouter } from "vue-router";
import type { AxiosError } from "axios";

const { saveBrandMutation } = useBrandsMutations();
const { brandRules } = useBrandRules();
const brand = ref<Brand>({} as Brand);
const brandValidator = useVuelidate(brandRules, brand);
const router = useRouter();

const onBrandSubmit = () => {
  brandValidator.value.$validate();
  if (!brandValidator.value.$error) {
    saveBrandMutation.mutate(brand.value);
  } else {
    alert(JSON.stringify(brandValidator.value.$errors.map((x) => x.$property)));
  }
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
      <VRow class="mt-1">
        <VCol cols="12" class="py-1">
          <VTextField label="nombre" v-model="brand.name" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VTextField label="Observacion" v-model="brand.observation" />
        </VCol>
        <VCol cols="12" class="py-1">
          <VBtn
            color="primary"
            @click="onBrandSubmit"
            :loading="saveBrandMutation.isPending.value"
            >Crear</VBtn
          >
        </VCol>
      </VRow>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
