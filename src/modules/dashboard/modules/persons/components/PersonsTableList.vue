<script setup lang="ts">
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import type { Provider } from "../models/Provider";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { computed } from "vue";
import { getPrimaryColor } from "@/utils/getColors";

interface props {
  persons: Provider[];
  isTableLoading: boolean;
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  person?: Provider;
}

const props = defineProps<props>();
const emits = defineEmits(["person-update", "person-delete"]);

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
  if (props.person) {
    if (props.person.id) {
      if (props.person.id == item.id) {
        return "selected-row";
      }
    }
  }
  return "";
};

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "Identificacion", value: "identity" },
  { text: "", value: "actions", width: 110 },
];

const onDelete = (person: Provider) => {
  emits("person-delete", person);
};
const onPersonSelected = (person: Provider) => {
  emits("person-update", person);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :theme-color="getPrimaryColor()"
    :items="props.persons"
    :loading="props.isTableLoading"
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
            color="black"
            v-bind="props"
            variant="text"
            @click="onPersonSelected(item)"
            :loading="isUpdateLoading"
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
            v-bind="props"
            color="error"
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
    v-if="props.persons.length > 10"
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
