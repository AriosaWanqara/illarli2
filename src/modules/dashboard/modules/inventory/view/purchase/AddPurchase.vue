<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import CreatePersonWithMinInfoForm from "../../../persons/components/CreatePersonWithMinInfoForm.vue";
import { ref } from "vue";
import type { Provider } from "../../../persons/models/Provider";
import { personRolEnum } from "../../../persons/constant/personRolEnum";
import CreatePurchaseMinGeneralInfo from "../../components/purchase/create/CreatePurchaseMinGeneralInfo.vue";
import ProductSelector from "../../components/purchase/create/ProductSelector.vue";
import type { PurchaseToSave2 } from "../../models/PurchaseOrder";
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import purchaseBanner from "@dashboard/assets/images/purchase_banner.png";
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import DoubleFormWrapper from "@/modules/dashboard/components/shared/DoubleFormWrapper.vue";

const person = ref<Provider>({} as Provider);
const purchase = ref<PurchaseToSave2>({} as PurchaseToSave2);
</script>

<template>
  <DoubleFormWrapper>
    <template #first-form>
      <div class="tw-px-4">
        <UIParentCardV2>
          <template #title>
            <div class="tw-h-[100px]">
              <div
                class="tw-h-[70px] tw-flex tw-justify-center tw-bg-[#7BD599]"
              >
                <div
                  class="tw-bg-white tw-rounded-full tw-border-[1px] tw-border-[#7BD599] tw-grid tw-place-content-center tw-h-[90px] tw-w-[90px]"
                >
                  <VImg :src="purchaseBanner" width="120" />
                </div>
              </div>
            </div>
          </template>
          <div class="tw-p-4">
            <CreatePurchaseMinGeneralInfo :purchase="purchase" />
          </div>
        </UIParentCardV2>
      </div>
    </template>
    <template #second-form></template>
  </DoubleFormWrapper>
</template>

<style scoped></style>
