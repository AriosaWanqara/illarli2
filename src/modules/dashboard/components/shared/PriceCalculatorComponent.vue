<script setup lang="ts">
import {
  PriceCalculator,
  PriceCalculatorType,
} from "@/service/PriceCalculator";
import { ref } from "vue";

interface props {
  price: number;
  rates: number[];
}

const props = defineProps<props>();
const emits = defineEmits(["calculate-end", "close"]);
const type = ref(PriceCalculatorType.QUANTITY);
const utility = ref(0);

const up = ref(0);
const upWithTaxes = ref(0);

const onUtilityChange = () => {
  if (utility.value) {
    if (utility.value >= 100 && type.value == PriceCalculatorType.MARGIN) {
      utility.value = 99;
    }
    let { unitPrice, unitPriceWithTaxes } = PriceCalculator(
      parseFloat(props.price.toString()),
      props.rates,
      parseFloat(utility.value.toString()),
      type.value
    );
    up.value = unitPrice;
    upWithTaxes.value = parseFloat(unitPriceWithTaxes.toFixed(2));
  }
};

const onCalculateEnd = () => {
  emits("calculate-end", upWithTaxes.value);
};
</script>

<template>
  <VCard>
    <VCardItem>
      <VRow>
        <VCol cols="12">
          <v-radio-group v-model="type" @update:model-value="onUtilityChange">
            <v-radio
              label="Cantidad ($)"
              :value="PriceCalculatorType.QUANTITY"
            ></v-radio>
            <v-radio
              label="Markup (%)"
              :value="PriceCalculatorType.MARKUP"
            ></v-radio>
            <v-radio
              label="Margen (%)"
              :value="PriceCalculatorType.MARGIN"
            ></v-radio>
          </v-radio-group>
        </VCol>
        <VCol cols="12">
          <VTextField
            placeholder="utilidad"
            v-model="utility"
            @input="onUtilityChange"
          />
        </VCol>
        <VCol cols="12">
          <div class="tw-flex tw-gap-1">
            <p>Unitario: {{ up }}</p>
            <p>impuestos: {{ upWithTaxes }}</p>
          </div>
        </VCol>
        <VCol cols="12">
          <VBtn @click="onCalculateEnd">Aceptar</VBtn>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<style scoped></style>
