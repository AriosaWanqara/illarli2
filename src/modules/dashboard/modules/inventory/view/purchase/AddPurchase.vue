<script setup lang="ts">
import CreatePersonWithMinInfoForm from "../../../persons/components/CreatePersonWithMinInfoForm.vue";
import { ref } from "vue";
import type { Provider } from "../../../persons/models/Provider";
import { personRolEnum } from "../../../persons/constant/personRolEnum";
import CreatePurchaseMinGeneralInfo from "../../components/purchase/create/CreatePurchaseMinGeneralInfo.vue";
import ProductSelector from "../../components/purchase/create/ProductSelector.vue";
import type { PurchaseToSave2 } from "../../models/PurchaseOrder";
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import purchaseBanner from "@dashboard/assets/images/purchase_banner.png";
import DoubleFormWrapper from "@/modules/dashboard/components/shared/DoubleFormWrapper.vue";

const person = ref<Provider>({} as Provider);
const purchase = ref<PurchaseToSave2>({} as PurchaseToSave2);
</script>

<template>
  <DoubleFormWrapper>
    <template #first-form>
      <UIParentCardV2>
        <template #title>
          <div class="tw-h-[90px]">
            <div
              class="tw-h-[65px] tw-flex tw-justify-center tw-bg-[#7BD599] tw-relative"
            >
              <div
                class="tw-bg-white tw-rounded-full tw-border-[1px] tw-border-[#7BD599] tw-grid tw-place-content-center tw-h-[80px] tw-w-[80px] tw-absolute tw-top-1"
              >
                <VImg :src="purchaseBanner" width="110" class="" />
              </div>
            </div>
          </div>
        </template>
        <div class="tw-py-4 tw-px-5">
          <CreatePurchaseMinGeneralInfo :purchase="purchase" />
        </div>
      </UIParentCardV2>
    </template>
    <template #second-form>
      <UIParentCardV2 class="tw-h-full">
        <div class="tw-p-4">
          <ProductSelector />
        </div>
      </UIParentCardV2>
    </template>
  </DoubleFormWrapper>
</template>

<style scoped></style>
