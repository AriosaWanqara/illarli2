<script setup lang="ts">
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
    <ViewScaffold :title="props.title">
      <div class="tw-flex tw-flex-col tw-gap-5">
        <p>
          {{ dialogText }}
        </p>
        <div class="tw-flex tw-justify-end tw-gap-3">
          <VBtn color="success" @click="emits('confirm-response', true)"
            >Si</VBtn
          >
          <VBtn
            color="error"
            variant="text"
            @click="emits('confirm-response', false)"
            >No</VBtn
          >
        </div>
      </div>
    </ViewScaffold>
  </VDialog>
</template>

<style scoped></style>
