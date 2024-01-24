<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

interface props {
  errorMessage: string;
  isRequired: boolean;
  labelMessage: string;
  value: string[];
  colNumber: number;
  placeholder: string;
}

const props = defineProps<props>();
const emits = defineEmits(["model-update"]);

const numberOfInputs = ref(1);
const valueOfInputs = ref(
  computed({
    get: () => props.value,
    set: (val) => emits("model-update", val),
  })
);

const operation = (type: boolean, index: number) => {
  if (type) {
    numberOfInputs.value++;
  } else {
    numberOfInputs.value--;
    if (numberOfInputs.value >= index) {
      for (let i = index - 1; i < numberOfInputs.value - 1; i++) {
        if (valueOfInputs.value[i + 1]) {
          valueOfInputs.value[i] = valueOfInputs.value[i + 1] ?? "";
        }
      }
      valueOfInputs.value[numberOfInputs.value - 1] = "";
      valueOfInputs.value = valueOfInputs.value.filter((x) => x != "");
    } else {
      valueOfInputs.value.pop();
    }
  }
};
</script>

<template>
  <VCol :cols="colNumber" class="py-0 tw-mt-3" v-for="item in numberOfInputs">
    <div class="tw-flex tw-flex-col tw-gap-1'">
      <label for="" class="tw-text-gray-400 tw-font-semibold tw-uppercase"
        >{{ props.labelMessage }}
        <span v-if="props.isRequired" class="tw-text-red-300">*</span></label
      >
      <VTextField
        :placeholder="placeholder"
        v-model="valueOfInputs[item - 1]"
        :error-messages="errorMessage"
        hide-details
      >
        <template #append-inner>
          <div class="tw-flex tw-items-center tw-gap-2">
            <div class="tw-cursor-pointer" @click="operation(false, item)">
              <Icon
                icon="ic:round-minus"
                class="tw-text-red-400"
                height="16"
                v-if="numberOfInputs > 1"
              />
            </div>
            <div class="tw-cursor-pointer" @click="operation(true, item)">
              <Icon
                v-if="item == numberOfInputs"
                icon="material-symbols:add-rounded"
                class="tw-text-blue-400"
                height="16"
              />
            </div>
          </div>
        </template>
      </VTextField>
    </div>
  </VCol>
</template>

<style scoped></style>
