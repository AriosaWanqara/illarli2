<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useProduct from "../../composables/product/useProduct";
import { useRoute } from "vue-router";
import Standar from "../../component/create/Standar.vue";
import Combo from "../../component/create/Combo.vue";
import Subproduct from "../../component/create/Subproduct.vue";
import { productTypeEnum } from "../../const/productTypeEnum";

const params = useRoute().params;
const { isProductFetchedLoading, productFetched, productFetchedHasError } =
  useProduct(params.id.toString());
</script>

<template>
  <ViewScaffold title="Agregar Producto">
    <template #actionBack>
      <RouterLink :to="{ name: 'product-list' }" class="d-sm-flex align-center">
        <ArrowLeftIcon size="18" class="mr-2" />
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isProductFetchedLoading">cargando..</p>
      <p v-else-if="productFetchedHasError">error..</p>
      <div v-else class="">
        <Standar
          v-if="productFetched.product_type_id == productTypeEnum.STANDAR"
          :productProps="productFetched"
        />
        <Combo
          v-if="productFetched.product_type_id == productTypeEnum.COMBO"
          :productProps="productFetched"
        />
        <Subproduct
          v-if="productFetched.product_type_id == productTypeEnum.SUBPRODUCT"
          :productProps="productFetched"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
