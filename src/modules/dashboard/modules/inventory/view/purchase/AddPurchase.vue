<script setup lang="ts">
import UIScaffold from "@/modules/dashboard/components/shared/UIScaffold.vue";
import CreatePersonWithMinInfoForm from "../../../persons/components/CreatePersonWithMinInfoForm.vue";
import { ref } from "vue";
import type { Provider } from "../../../persons/models/Provider";
import { personRolEnum } from "../../../persons/constant/personRolEnum";
import CreatePurchaseMinGeneralInfo from "../../components/purchase/create/CreatePurchaseMinGeneralInfo.vue";
import type { PurchaseToSave2 } from "../../models/PurchaseOrder";

const person = ref<Provider>({} as Provider);
const purchase = ref<PurchaseToSave2>({} as PurchaseToSave2);
</script>

<template>
  <UIScaffold title="Compras">
    <template #default>
      <!-- <CreatePersonWithMinInfoForm
        :person="person"
        :person-type="personRolEnum.SUPPLIER"
      /> -->
      <CreatePurchaseMinGeneralInfo :purchase="purchase" />
    </template>
  </UIScaffold>
</template>

<style scoped></style>
