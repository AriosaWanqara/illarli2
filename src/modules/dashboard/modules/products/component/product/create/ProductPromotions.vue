<script setup lang="ts">
import usePromotions from "@/modules/dashboard/modules/pricing/compossables/promotion/usePromotions";
import type { baseProduct } from "../../../models/products/Product";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";

import draggable from "vuedraggable";

interface props {
  product: baseProduct;
}

const props = defineProps<props>();
const { isPromotionsLoading, promotions, promotionsHasError } = usePromotions();

const log = (params: any) => {
  let element = params.moved.element;
  let newIndex = params.moved.newIndex + 1;

  if (element.order > newIndex) {
    props.product.discount.map((x) => {
      if (
        x.order >= newIndex &&
        x.order <= element.order &&
        element.id != x.id
      ) {
        x.order = x.order + 1;
      }
    });
    props.product.discount.find((x) => x.id == element.id)!.order = newIndex;
  } else {
    props.product.discount.map((x) => {
      if (
        x.order <= newIndex &&
        x.order >= element.order &&
        element.id != x.id
      ) {
        x.order = x.order - 1;
      }
    });
    props.product.discount.find((x) => x.id == element.id)!.order = newIndex;
  }
};
</script>

<template>
  <FormSeccion title="Promociones" border>
    <VSelect
      :items="promotions"
      :item-title="'name'"
      placeholder="selec promotions"
      multiple
      :loading="isPromotionsLoading"
      v-model="props.product.discount"
      return-object
      hide-details
    />
    <draggable :list="props.product.discount" @change="log" item-key="id">
      <template #item="{ element }">
        <div class="tw-flex tw-gap-1 cur">
          {{ element.name }}
          {{ element.order }}
        </div>
      </template>
    </draggable>
  </FormSeccion>
</template>

<style scoped></style>
