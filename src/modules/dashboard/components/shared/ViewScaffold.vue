<script setup lang="ts">
import UiParentCard from "@dashboard/components/shared/UiParentCard.vue";
const props = defineProps({
  title: String,
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="tw-mt-4">
        <UiParentCard :title="props.title">
          <template v-slot:actionBack>
            <slot name="actionBack"></slot>
          </template>
          <template v-slot:action>
            <slot name="action"></slot>
          </template>
          <slot />
        </UiParentCard>
      </div>
    </v-col>
  </v-row>
</template>
