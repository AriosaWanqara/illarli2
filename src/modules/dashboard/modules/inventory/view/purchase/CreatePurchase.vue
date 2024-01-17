<script setup lang="ts">
import ButtonFileUploader from "@/modules/dashboard/components/shared/ButtonFileUploader.vue";
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";

const fileName = ref();

const onFileChanged = (e: any) => {
  console.log(e);
  fileName.value = e.name;
};
</script>

<template>
  <ViewScaffold title="Crear compra 2">
    <template #action>
      <div class="tw-flex tw-gap-3 tw-items-center" v-auto-animate>
        <p class="tw-font-semibold tw-text-green-500" v-if="fileName">
          {{ fileName }}
        </p>
        <ButtonFileUploader
          append-icon=""
          :button-text="'Subir xml'"
          :color="'success'"
          :is-button-loading="false"
          accept=".xml"
          prepend-icon="mdi-plus"
          variant="tonal"
          @file-changed="onFileChanged"
        />
      </div>
    </template>
    <template #default> </template>
  </ViewScaffold>
</template>

<style scoped></style>
