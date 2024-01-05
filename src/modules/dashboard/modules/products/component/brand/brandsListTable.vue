<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useBrands from "../../composables/brand/useBrands";
import type { Brand } from "../../models/Brand";
import { computed } from "vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  brand: Brand;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["brand-update", "brand-delete"]);
const { brands, isBrandsLoading } = useBrands();

const dataTable = ref();
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const page = ref(1);
const headers: Header[] = [
  { text: "Nombre", value: "name", sortable: true },
  { text: "Acciones", value: "actions", width: 110 },
];

const onDelete = (brand: Brand) => {
  emits("brand-delete", brand);
};

const onBrandSelected = (brand: Brand) => {
  emits("brand-update", brand);
};

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.brand.id) {
    if (props.brand.id == item.id) {
      return "selected-row";
    }
  }
  return "";
};
watch(page, () => {
  if (page.value > 0) {
    dataTable.value.updatePage(page.value);
  }
});
</script>

<template>
  <div>
    <EasyDataTable
      :headers="headers"
      :theme-color="'#f48225'"
      :items="brands"
      :body-row-class-name="bodyRowClassNameFunction"
      :loading="isBrandsLoading"
      ref="dataTable"
      alternating
      :search-field="['name', 'description']"
      :search-value="props.search"
      :rows-per-page="10"
      hide-footer
      class="customize-table"
    >
      <template #item-name="item">
        <div class="tw-flex tw-flex-col">
          <p class="tw-font-semibold tw-leading-4">{{ item.name }}</p>
          <p
            class="tw-font-semibold tw-leading-4 tw-text-gray-400 tw-w-[15ch] tw-truncate"
          >
            {{ item.observation }}
          </p>
        </div>
      </template>
      <template #item-actions="item">
        <v-tooltip text="Edit">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              color="black"
              v-bind="props"
              :loading="isUpdateLoading"
              variant="text"
              @click="onBrandSelected(item)"
            >
              <Icon icon="lucide:pencil" />
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              color="error"
              flat
              v-bind="props"
              variant="text"
              @click="onDelete(item)"
              :loading="isDeleteLoading"
            >
              <Icon icon="mdi:trash-can-outline" />
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </EasyDataTable>
    <div
      class="tw-flex tw-justify-between tw-items-center"
      v-if="brands.length > 10"
    >
      <p class="tw-text-sm">
        Mostrando {{ currentPageLastIndex }} de
        {{ clientItemsLength }} resultados
      </p>
      <v-pagination
        :length="maxPaginationNumber"
        density="compact"
        color="primary"
        v-model="page"
        class="tw-flex-1"
      />
    </div>
  </div>
</template>

<style scoped></style>
