<script setup lang="ts">
import { ref } from "vue";
const uploader = ref();

interface props {
  variant: "elevated" | "flat" | "outlined" | "plain" | "text" | "tonal";
  color: "success" | "info" | "";
  buttonText: string;
  appendIcon: string;
  prependIcon: string;
  isButtonLoading: boolean;
  accept: string;
}

const props = defineProps<props>();
const emits = defineEmits(["file-changed"]);

const onButtonClick = () => {
  uploader.value.click();
};

const onFileChanged = (e: any) => {
  emits("file-changed", e.target.files[0]);
};
</script>

<template>
  <div class="">
    <VBtn
      @click="onButtonClick"
      :variant="props.variant"
      :append-icon="props.appendIcon"
      :prepend-icon="props.prependIcon"
      :loading="props.isButtonLoading"
      :color="props.color"
      >{{ props.buttonText }}</VBtn
    >
    <input
      ref="uploader"
      class="tw-hidden"
      type="file"
      :accept="props.accept"
      @change="onFileChanged"
    />
  </div>
</template>

<style scoped></style>
