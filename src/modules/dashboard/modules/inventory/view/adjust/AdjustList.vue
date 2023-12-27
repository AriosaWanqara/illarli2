<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import useAdjust from "../../composables/adjust/useAdjust";
import useAdjustMutations from "../../composables/adjust/useAdjustMutations";
import type { Adjust } from "../../models/Adjust";
import { watch } from "vue";
import type { AxiosError } from "axios";

const { adjust, adjustHasError, isAdjustLoading, refetchAdjust } = useAdjust();
const { updateAdjustMutations } = useAdjustMutations();

const onAproved = (adjust: Adjust) => {
  let newAdjust: Partial<Adjust> = {
    status: "07",
    id: adjust.id,
  };
  updateAdjustMutations.mutate(newAdjust);
};

watch(updateAdjustMutations.isError, () => {
  if (updateAdjustMutations.isError.value) {
    let x = updateAdjustMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(updateAdjustMutations.isSuccess, () => {
  if (updateAdjustMutations.isSuccess.value) {
    refetchAdjust();
  }
});
</script>

<template>
  <UIScaffold>
    <template #left-action>
      <h1>Ajustes</h1>
    </template>
    <template #right-action>
      <RouterLink :to="{ name: 'adjust-add' }">
        <VBtn>agregar</VBtn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isAdjustLoading">cargando..</p>
      <p v-else-if="adjustHasError">error</p>
      <div
        class="tw-flex tw-gap-1 tw-items-center"
        v-else
        v-for="item in adjust"
      >
        <p>{{ item.id }}</p>
        <div v-if="item.status == 'REGISTRADO'">
          <VBtn @click="onAproved(item)">Aprobar</VBtn>
        </div>
        <div v-else>
          {{ item.status }}
        </div>
      </div>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
