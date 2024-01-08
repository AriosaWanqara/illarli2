<script setup lang="ts">
import type {
  BodyRowClassNameFunction,
  Header,
  Item,
} from "vue3-easy-data-table";
import useRoles from "../../composables/rol/useRoles";
import type { Rol } from "../../models/Rol";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { computed } from "vue";
import { getPrimaryColor } from "@/utils/getColors";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  rol?: Rol;
}

const props = defineProps<props>();
const emits = defineEmits(["rol-delete", "rol-update"]);

const { isRolesLoading, roles } = useRoles();

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
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
  if (props.rol) {
    if (props.rol.id) {
      if (props.rol.id == item.id) {
        return "selected-row";
      }
    }
  }
  return "";
};

const onDelete = (rol: Rol) => {
  emits("rol-delete", rol);
};

const onRolUpdate = (rol: Rol) => {
  emits("rol-update", rol);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :theme-color="getPrimaryColor()"
    :items="roles"
    :loading="isRolesLoading"
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
            @click="onRolUpdate(item)"
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
    v-if="roles.length > 10"
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
