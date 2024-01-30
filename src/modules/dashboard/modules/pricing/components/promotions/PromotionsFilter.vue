<script setup lang="ts">
import { ref } from "vue";
import { watch } from "vue";
import { computed } from "vue";
import type { FilterOption } from "vue3-easy-data-table";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { DatePicker } from "v-calendar";
import moment from "moment";

interface props {
  visibility: boolean;
}

const props = defineProps<props>();
const emits = defineEmits(["close", "return-filters"]);
const visibility = computed({
  get: () => props.visibility,
  set: (val) => emits("close", val),
});

const range = ref<[number, number]>([0, 0]);
const startDate = ref();
const weekday = ref();

const filterOptions = computed((): FilterOption[] => {
  const filterOptionsArray: FilterOption[] = [];
  if (range.value.some((x) => x > 0)) {
    filterOptionsArray.push({
      field: "discount",
      comparison: "between",
      criteria: range.value,
    });
  }
  if (startDate.value) {
    filterOptionsArray.push({
      field: "starting_date",
      comparison: (value: any, criteria: string) => {
        return moment(criteria).isAfter(moment(value));
      },
      criteria: startDate.value,
    });
  }
  if (weekday.value) {
    filterOptionsArray.push({
      field: "weekday",
      comparison: "=",
      criteria: weekday.value,
    });
  }
  return filterOptionsArray;
});

watch(
  filterOptions,
  () => {
    emits("return-filters", filterOptions.value);
  },
  { deep: true }
);
</script>

<template>
  <Teleport to="body">
    <VNavigationDrawer
      v-model="visibility"
      width="320"
      temporary
      location="right"
    >
      <div class="tw-px-4 tw-py-4 tw-flex tw-flex-col tw-h-full">
        <header class="tw-px-2">
          <div class="tw-flex tw-justify-between tw-items-center">
            <h1 class="tw-font-semibold">Filtros</h1>
            <VBtn
              icon="mdi-close"
              variant="text"
              density="compact"
              @click="visibility = false"
            ></VBtn>
          </div>
        </header>
        <PerfectScrollbar class="tw-flex-1">
          <DatePicker v-model="startDate">
            <template #default="{ inputValue, inputEvents }">
              <VTextField
                placeholder="Fecha fin"
                append-inner-icon="mdi-calendar-blank"
                :model-value="inputValue"
                v-on="inputEvents"
              ></VTextField>
            </template>
          </DatePicker>
          <VBtn
            @click="
              () => {
                range = [10, 30];
              }
            "
          >
            range
          </VBtn>
          <VBtn
            @click="
              () => {
                weekday = '0';
              }
            "
          >
            weekday
          </VBtn>
          <VBtn
            @click="
              () => {
                range = [0, 0];
                startDate = null;
                weekday = null;
              }
            "
          >
            test reset
          </VBtn>
        </PerfectScrollbar>
      </div>
    </VNavigationDrawer>
  </Teleport>
</template>

<style scoped></style>
