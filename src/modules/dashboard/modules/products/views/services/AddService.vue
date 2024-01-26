<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import CreateServiceBasicInfo from "../../component/services/CreateServiceBasicInfo.vue";
import serviceBanner from "@dashboard/assets/images/service_banner.png";
import CreateServiceForm from "../../component/services/CreateServiceForm.vue";
</script>

<template>
  <div class="tw-flex tw-gap-x-3 tw-flex-wrap md:tw-flex-row tw-flex-col">
    <div class="md:tw-max-w-[446px] tw-h-min">
      <VCard class="py-0" variant="flat">
        <VCardTitle class="py-0 px-0">
          <div class="tw-h-[70px]">
            <div
              class="tw-h-[55px] tw-bg-[#3EBBCC] tw-relative tw-w-full tw-flex tw-justify-center"
            >
              <div
                class="tw-bg-white tw-rounded-full tw-h-[75px] tw-w-[75px] tw-flex tw-justify-center tw-items-center tw-border-[1px] tw-border-[#3EBBCC] tw-top-2 tw-absolute"
              >
                <img :src="serviceBanner" alt="" height="60" width="60" />
              </div>
            </div>
          </div>
          <div class="tw-text-center tw-mt-5">
            <h2 class="title-1 tw-font-semibold">
              Nombre del servicio:<span class="tw-font-medium">asdasd</span>
            </h2>
          </div>
        </VCardTitle>
        <VCardItem class="py-0 px-0">
          <div class="tw-px-4">
            <CreateServiceBasicInfo />
          </div>
        </VCardItem>
      </VCard>
    </div>
    <div class="tw-flex-1">
      <ViewScaffold>
        <template #default>
          <CreateServiceForm />
        </template>
      </ViewScaffold>
    </div>
  </div>
</template>

<style scoped></style>
