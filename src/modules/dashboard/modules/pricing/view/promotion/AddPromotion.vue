<script setup lang="ts">
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import CreateQuantityPromotionsForm from "../../components/promotions/create/CreateQuantityPromotionsForm.vue";
import CreateDayPromotionsForm from "../../components/promotions/create/CreateDayPromotionsForm.vue";
import CreateBetweenHoursPromotionsForm from "../../components/promotions/create/CreateBetweenHoursPromotionsForm.vue";
import CreateBetweenDaysPromotionsForm from "../../components/promotions/create/CreateBetweenDaysPromotionsForm.vue";
import usePromotionMutations from "../../compossables/promotion/usePromotionMutations";
import type { Promotion } from "../../models/Promotion";

const { savePromotionMutation } = usePromotionMutations();
const router = useRouter();
const tab = ref("1");

const promotion = ref<Promotion>({} as Promotion);

const onPromotionSubmit = (promotion: Promotion) => {
  savePromotionMutation.mutate(promotion);
};

watch(savePromotionMutation.isError, () => {
  if (savePromotionMutation.isError.value) {
    let x = savePromotionMutation.error.value as AxiosError;
    alert(JSON.stringify(x));
  }
});

watch(savePromotionMutation.isSuccess, () => {
  if (savePromotionMutation.isSuccess.value) {
    router.push({ name: "promotions-list" });
  }
});
</script>

<template>
  <ViewScaffold>
    <v-tabs v-model="tab" density="compact">
      <v-tab density="compact" :ripple="false" value="1" color="info">
        Cantidad
      </v-tab>
      <v-tab density="compact" :ripple="false" value="2" color="info">
        Dia de la semana
      </v-tab>
      <v-tab density="compact" :ripple="false" value="3" color="info">
        entre dias
      </v-tab>
      <v-tab density="compact" :ripple="false" value="4" color="info">
        entre horas
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="1">
        <UIParentCardV2>
          <CreateQuantityPromotionsForm
            :button-text="'Guardar'"
            :is-button-loading="savePromotionMutation.isPending.value"
            :promotions="promotion"
            @promotion-submit="onPromotionSubmit"
          />
        </UIParentCardV2>
      </v-window-item>
      <v-window-item value="2">
        <CreateDayPromotionsForm
          :button-text="'Guardar'"
          :is-button-loading="savePromotionMutation.isPending.value"
          :promotions="promotion"
          @promotion-submit="onPromotionSubmit"
        />
      </v-window-item>

      <v-window-item value="3">
        <CreateBetweenDaysPromotionsForm
          :button-text="'Guardar'"
          :is-button-loading="savePromotionMutation.isPending.value"
          :promotions="promotion"
          @promotion-submit="onPromotionSubmit"
        />
      </v-window-item>
      <v-window-item value="4">
        <CreateBetweenHoursPromotionsForm
          :button-text="'Guardar'"
          :is-button-loading="savePromotionMutation.isPending.value"
          :promotions="promotion"
          @promotion-submit="onPromotionSubmit"
        />
      </v-window-item>
    </v-window>
  </ViewScaffold>
</template>

<style scoped></style>
