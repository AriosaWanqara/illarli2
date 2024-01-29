<script setup lang="ts">
import ViewScaffold from "@/modules/dashboard/components/shared/ViewScaffold.vue";
import ServiceTableList from "../../component/services/ServiceTableList.vue";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import ProductFilternavegationDrawer from "../../component/product/ProductFilternavegationDrawer.vue";

const newFilters = ref([]);
const openFilter = ref(false);

const onServiceUpdate = (serviceToUpdate: any) => {};
const onServiceDelete = (serviceToDelete: any) => {};
const onServiceSelected = (serviceSelected: any) => {};
const onServicesFilters = (filterServices: any[]) => {};

const onNewFilter = (filters: any) => {
  newFilters.value = filters;
};
</script>

<template>
  <ViewScaffold>
    <template #default>
      <div class="tw-flex tw-flex-col tw-gap-2 tw-mb-5">
        <div class="tw-flex tw-justify-between tw-items-center tw-gap-10">
          <div class="tw-flex-1">
            <VTextField
              hide-details
              placeholder="buscar servicio"
              variant="outlined"
            >
              <template #prepend-inner>
                <Icon
                  icon="material-symbols:search-rounded"
                  height="18"
                  class="tw-text-[#036666] tw-mr-9"
                />
              </template>
            </VTextField>
          </div>
          <div class="tw-flex tw-gap-3">
            <VBtn color="borderColor" variant="outlined" flat>
              <template #prepend>
                <Icon
                  icon="humbleicons:dots-vertical"
                  class="tw-text-[#036666]"
                />
              </template>
              <p class="tw-text-[#036666]">Acciones</p>
            </VBtn>
            <VBtn
              color="info"
              variant="elevated"
              flat
              prepend-icon="mdi-download"
            >
              Exportar</VBtn
            >
            <RouterLink :to="{ name: 'product-service-add' }">
              <v-btn
                flat
                color="success"
                prepend-icon="mdi-plus"
                variant="elevated"
                >Añadir Servicio</v-btn
              >
            </RouterLink>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-flex tw-gap-5">
            <p>Todos los servicios (20)</p>
            <p>Disponibles (15)</p>
            <p>Desactivados (5)</p>
          </div>
          <div class="">
            <VBtn
              variant="tonal"
              :color="newFilters.length > 0 ? 'info' : 'primary'"
              class="px-0"
              @click="openFilter = true"
            >
              <Icon
                icon="mdi:filter-off"
                :class="'tw-text-blue-600'"
                height="16"
                v-if="newFilters.length > 0"
              />
              <Icon
                icon="mdi:filter"
                :class="'textPrimary'"
                height="16"
                v-else
              />
            </VBtn>
          </div>
        </div>
      </div>
      <ServiceTableList
        :is-modify-loading="false"
        :is-delete-loading="false"
        :is-table-error="false"
        :services="[]"
        :service="{}"
        @update-service="onServiceUpdate"
        @delete-service="onServiceDelete"
        @filter-service="onServicesFilters"
        @selected-service="onServiceSelected"
      />
      <ProductFilternavegationDrawer
        :close="openFilter"
        @return-filters="onNewFilter"
        @close="
          (visibility) => {
            openFilter = visibility;
          }
        "
      />
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
