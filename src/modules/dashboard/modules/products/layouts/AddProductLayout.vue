<script setup lang="ts">
import CreateProductSelector from "./CreateProductSelector.vue";
</script>

<template>
  <div class="tw-flex tw-gap-x-3 tw-flex-wrap md:tw-flex-row tw-flex-col">
    <CreateProductSelector class="md:tw-max-w-[446px] tw-h-min" />
    <div class="tw-flex-1">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" ss="lol" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
