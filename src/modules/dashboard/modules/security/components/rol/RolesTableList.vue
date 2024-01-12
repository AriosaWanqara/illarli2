<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useRoles from "../../composables/rol/useRoles";
import type { Rol } from "../../models/Rol";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  search?: string;
  rol?: Rol;
}

const props = defineProps<props>();
const emits = defineEmits(["rol-delete", "rol-update"]);

const { isRolesLoading, roles, rolesHasError } = useRoles();

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];

const onDelete = (rol: Rol) => {
  emits("rol-delete", rol);
};

const onRolUpdate = (rol: Rol) => {
  emits("rol-update", rol);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isRolesLoading"
    :item="rol"
    :items="roles"
    :is-error="rolesHasError"
  >
    <template #actions="{ item }">
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
  </BaseTableComponent>
</template>

<style scoped></style>
