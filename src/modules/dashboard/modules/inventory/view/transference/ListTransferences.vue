<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import useTransferences from "../../composables/transference/useTransferences";
import useTransferenceMutations from "../../composables/transference/useTransferenceMutations";
import type { Transference } from "../../models/Transference";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import TransferenceTableList from "../../components/transference/TransferenceTableList.vue";

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
  <ViewScaffold>
    <template #action> </template>
    <template #default>
      <div>
        <div class="tw-flex tw-justify-end tw-gap-2 tw-mb-2">
          <RouterLink :to="{ name: 'transference-reception' }">
            <VBtn> Recibir </VBtn>
          </RouterLink>
          <RouterLink :to="{ name: 'transference-add' }">
            <VBtn color="success"> agregar </VBtn>
          </RouterLink>
        </div>
        <TransferenceTableList />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
