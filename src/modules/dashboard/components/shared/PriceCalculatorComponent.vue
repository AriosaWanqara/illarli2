<script setup lang="ts">
import type { Dropdown } from "@/models/Dropdown";
import {
  PriceCalculator,
  PriceCalculatorType,
  reverseCalculator,
} from "@/service/PriceCalculator";
import { ref } from "vue";

interface props {
  rates: { name: string; value: number }[];
}

const props = defineProps<props>();
const emits = defineEmits(["calculate-end", "close"]);
const type = ref(PriceCalculatorType.QUANTITY);
const utility = ref(0);
const price = ref(0);

const up = ref(0);
const upWithTaxes = ref(0);
const summary = ref<Dropdown[]>([]);

const onUtilityChange = () => {
  if (!utility.value) {
    utility.value = 0;
  }
  if (!price.value) {
    price.value = 0;
  }
  if (utility.value) {
    if (utility.value >= 100 && type.value == PriceCalculatorType.MARGIN) {
      utility.value = 99;
    }
    let rates = props.rates.map((x) => x.value);
    let { unitPrice, unitPriceWithTaxes } = PriceCalculator(
      parseFloat(price.value.toString()),
      rates,
      parseFloat(utility.value.toString()),
      type.value
    );
    up.value = unitPrice;
    upWithTaxes.value = parseFloat(unitPriceWithTaxes.toFixed(2));
    summary.value = reverseCalculator(upWithTaxes.value, props.rates);
    summary.value.unshift({
      label: "P.C",
      value: price.value.toString(),
    });
    summary.value.push({
      label: "TOTAL",
      value: upWithTaxes.value.toString(),
    });
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
          <VTextField
            placeholder="costo"
            v-model="price"
            type="number"
            hide-details
            @input="onUtilityChange"
          />
        </VCol>
        <VCol cols="12" class="py-0">
          <v-radio-group
            v-model="type"
            @update:model-value="onUtilityChange"
            density="compact"
          >
            <div class="tw-flex tw-gap-1">
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
            </div>
          </v-radio-group>
        </VCol>
        <VCol cols="12" class="py-0">
          <VTextField
            placeholder="utilidad"
            v-model="utility"
            type="number"
            hide-details
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
          <div class="tw-flex tw-gap-1 tw-flex-col">
            <div
              class="tw-flex tw-gap-1 tw-justify-end"
              v-for="item in summary"
            >
              <p>{{ item.label }}:</p>
              <p>{{ item.value }}</p>
            </div>
          </div>
        </VCol>
        <VCol cols="12">
          <div class="tw-py-2">
            <VBtn @click="onCalculateEnd">Aceptar</VBtn>
          </div>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<style scoped></style>
