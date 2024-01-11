<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ViewScaffold from "./ViewScaffold.vue";

interface props {
  showModal: boolean;
  dialogText: string;
  title: string;
}

const props = defineProps<props>();
const emits = defineEmits(["confirm-response"]);
</script>

<template>
  <VDialog max-width="350" v-model="props.showModal">
    <ViewScaffold>
      <div
        class="tw-flex tw-flex-col tw-gap-5 tw-items-center tw-pb-5 tw-text-center"
      >
        <Icon
          icon="ph:warning-circle-fill"
          class="tw-text-yellow-400"
          height="70"
        />
        <h1 class="tw-font-semibold">{{ props.title }}</h1>
        <p>
          {{ dialogText }}
        </p>
        <div class="tw-flex tw-justify-end tw-gap-3">
          <VBtn
            variant="elevated"
            color="info"
            @click="emits('confirm-response', true)"
            >Si, Eliminar item</VBtn
          >
          <VBtn
            color="error"
            variant="elevated"
            @click="emits('confirm-response', false)"
            >Cancelar</VBtn
          >
        </div>
      </div>
    </ViewScaffold>
  </VDialog>
</template>

<style scoped></style>
