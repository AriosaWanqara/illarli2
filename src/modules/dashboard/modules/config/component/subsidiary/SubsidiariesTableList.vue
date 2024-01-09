<script setup lang="ts">
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useSubsidiaries from "../../composables/subsidiary/useSubsidiaries";
import { ref } from "vue";
import { computed } from "vue";
import type { Subsidiary } from "../../models/Subsidiary";
import { getPrimaryColor } from "@/utils/getColors";
import { Icon } from "@iconify/vue";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  subsidiary?: Subsidiary;
}

const props = defineProps<props>();
const emits = defineEmits(["subsidiary-update", "subsidiary-delete"]);
const { isSubsidiariesLoading, subsidiaries, subsidiariesHasError } =
  useSubsidiaries();

const headers: Header[] = [
  { value: "businessname", text: "Nombre" },
  { value: "actions", text: "Acciones", width: 110 },
];

const dataTable = ref();
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const page = ref(1);

const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  _: number
): string => {
  if (props.subsidiary) {
    if (props.subsidiary.id) {
      if (props.subsidiary.id == item.id) {
        return "selected-row";
      }
    }
  }
  return "";
};

const onDelete = (subsidiary: Subsidiary) => {
  emits("subsidiary-delete", subsidiary);
};
const onSelect = (subsidiary: Subsidiary) => {
  emits("subsidiary-update", subsidiary);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :loading="isSubsidiariesLoading"
    :theme-color="getPrimaryColor()"
    :items="subsidiaries"
    alternating
    ref="dataTable"
    :body-row-class-name="bodyRowClassNameFunction"
    :search-field="['name', 'description']"
    :search-value="props.search"
    :rows-per-page="10"
    hide-footer
    class="customize-table"
  >
    <template #item-actions="item">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            v-bind="props"
            color="black"
            variant="text"
            :loading="isUpdateLoading"
            @click="onSelect(item)"
          >
            <Icon icon="lucide:pencil" />
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Delete">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            color="error"
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
    v-if="subsidiaries.length > 10"
  >
    <p class="tw-text-sm">
      Mostrando {{ currentPageLastIndex }} de {{ clientItemsLength }} resultados
    </p>
    <v-pagination
      :length="maxPaginationNumber"
      density="compact"
      color="primary"
      v-model="page"
      class="tw-flex-1"
    />
  </div>
</template>

<style scoped></style>
