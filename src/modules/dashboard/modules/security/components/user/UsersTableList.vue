<script setup lang="ts">
import BaseTableComponent from "@/modules/dashboard/components/shared/BaseTableComponent.vue";
import { Icon } from "@iconify/vue";
import type { Header } from "vue3-easy-data-table";
import useUsers from "../../composables/user/useUsers";
import type { User } from "../../models/User";

interface props {
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  user?: User;
  search?: string;
}

const props = defineProps<props>();
const emits = defineEmits(["user-delete", "user-update"]);

const { isUserLoading, users } = useUsers();

const headers: Header[] = [
  { text: "Nombre", value: "name" },
  { text: "", value: "actions", width: 110 },
];

const onDelete = (user: User) => {
  emits("user-delete", user);
};

const onUserUpdate = (user: User) => {
  emits("user-update", user);
};
</script>

<template>
  <BaseTableComponent
    :headers="headers"
    :is-table-loading="isUserLoading"
    :item="user"
    :items="users"
  >
    <template #actions="{ item }">
      <v-tooltip text="Edit">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            flat
            color="black"
            v-bind="props"
            @click="onUserUpdate(item)"
            variant="text"
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
  </BaseTableComponent>
</template>

<style scoped></style>
