<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import useTransferences from "../../composables/transference/useTransferences";
import useTransferenceMutations from "../../composables/transference/useTransferenceMutations";
import type { Transference } from "../../models/Transference";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";

const { user } = useUserStore();
const {
  isTransferencesLoading,
  transferences,
  transferencesHasError,
  transferencesRefetch,
} = useTransferences();

const { updateTransferenceMutations } = useTransferenceMutations();

const onAproved = (item: Transference) => {
  let newTransference: Partial<Transference> = {
    id: item.id,
    status: "07",
    details: [],
  };
  item.details.map((x) => {
    newTransference.details?.push({
      ...x,
      amount: x.order_amount,
    });
  });
  updateTransferenceMutations.mutate(newTransference);
};

const onReception = (item: Transference) => {
  let newTransference: Partial<Transference> = {
    id: item.id,
    status: "10",
    recepter_user_id: user.id,
    reception_date: moment(new Date()).format("DD-MM-YYYY HH:mm"),
    details: [],
  };
  item.details.map((x) => {
    newTransference.details?.push({
      ...x,
      amount: x.order_amount,
    });
  });
  updateTransferenceMutations.mutate(newTransference);
};

watch(updateTransferenceMutations.isError, () => {
  if (updateTransferenceMutations.isError.value) {
    let x = updateTransferenceMutations.error.value as AxiosError;
    alert(JSON.stringify(x));
  }
});

watch(updateTransferenceMutations.isSuccess, () => {
  if (updateTransferenceMutations.isSuccess.value) {
    transferencesRefetch();
  }
});
</script>

<template>
  <UIScaffold title="Transferencias">
    <template #left-action> Transferencias </template>
    <template #right-action>
      <RouterLink :to="{ name: 'transference-reception' }">
        <VBtn> Recibir </VBtn>
      </RouterLink>
      <RouterLink :to="{ name: 'transference-add' }">
        <VBtn color="success"> agregar </VBtn>
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isTransferencesLoading">cargando..</p>
      <p v-else-if="transferencesHasError">error</p>
      <div
        class="tw-flex tw-gap-1 tw-items-center"
        v-else
        v-for="item in transferences"
      >
        <p>{{ item.status }}</p>
        <div v-if="item.status == 'REGISTRADO'">
          <VBtn
            @click="onAproved(item)"
            :loading="updateTransferenceMutations.isPending.value"
            >Aprobar</VBtn
          >
        </div>
        <div v-if="item.status == 'PENDIENTE'">
          <VBtn
            @click="onReception(item)"
            :loading="updateTransferenceMutations.isPending.value"
            >Recibir</VBtn
          >
        </div>
        <div v-else>
          {{ item.id }}
        </div>
      </div>
    </template>
  </UIScaffold>
</template>

<style scoped></style>
