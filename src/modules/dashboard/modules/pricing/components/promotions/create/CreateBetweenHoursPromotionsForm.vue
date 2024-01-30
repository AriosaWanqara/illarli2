<script setup lang="ts">
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import type { Promotion } from "../../../models/Promotion";
import { DatePicker } from "v-calendar";
import moment from "moment";

interface props {
  promotions: Promotion;
  buttonText: string;
  isButtonLoading: boolean;
}

const props = defineProps<props>();
const emits = defineEmits(["promotion-submit"]);

props.promotions.starting_time = new Date().toString();
props.promotions.ending_time = new Date().toString();

const onPromotionSubmit = () => {
  props.promotions.starting_date = moment(
    props.promotions.starting_date
  ).format("YYYY-MM-DD HH:mm");
  props.promotions.ending_date = moment(props.promotions.ending_date).format(
    "YYYY-MM-DD HH:mm"
  );
  //   props.promotions.starting_time = moment(
  //     props.promotions.starting_time
  //   ).format("YYYY-MM-DD HH:mm");
  //   props.promotions.ending_time = moment(props.promotions.ending_time).format(
  //     "YYYY-MM-DD HH:mm"
  //   );
  emits("promotion-submit", { ...props.promotions, filter: "4" });
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <InputSection label-message="Nombre de la promocion" required>
        <VTextField
          placeholder="Ingrese el nombre"
          v-model="props.promotions.name"
        />
      </InputSection>
    </VCol>
    <VCol cols="12">
      <InputSection label-message="Descuento de la promocion" required>
        <VTextField
          placeholder="Descuento"
          type="number"
          v-model="props.promotions.discount"
        />
      </InputSection>
    </VCol>
    <VCol cols="12" md="6">
      <InputSection label-message="Start Hour">
        <DatePicker v-model="props.promotions.starting_time" mode="time">
        </DatePicker>
      </InputSection>
    </VCol>
    <VCol cols="12" md="6">
      <InputSection label-message="End Hour">
        <DatePicker v-model="props.promotions.ending_time" mode="time">
        </DatePicker>
      </InputSection>
    </VCol>
    <VCol cols="12" md="6">
      <InputSection label-message="Start date">
        <DatePicker v-model="props.promotions.starting_date">
          <template #default="{ inputValue, inputEvents }">
            <VTextField
              placeholder="Fecha inicio"
              append-inner-icon="mdi-calendar-blank"
              :model-value="inputValue"
              v-on="inputEvents"
            ></VTextField>
          </template>
        </DatePicker>
      </InputSection>
    </VCol>
    <VCol cols="12" md="6">
      <InputSection label-message="End date">
        <DatePicker v-model="props.promotions.ending_date">
          <template #default="{ inputValue, inputEvents }">
            <VTextField
              placeholder="Fecha fin"
              append-inner-icon="mdi-calendar-blank"
              :model-value="inputValue"
              v-on="inputEvents"
            ></VTextField>
          </template>
        </DatePicker>
      </InputSection>
    </VCol>
    <VCol cols="12">
      <InputSection label-message="Nombre de la promocion">
        <VTextarea
          placeholder="Descripcion de la promocion"
          v-model="props.promotions.description"
        />
      </InputSection>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-end">
        <VBtn
          color="success"
          :loading="props.isButtonLoading"
          @click="onPromotionSubmit"
        >
          {{ props.buttonText }}
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
