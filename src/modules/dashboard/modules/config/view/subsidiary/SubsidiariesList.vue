<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useSubsidiaries from "@dashboard/modules/config/composables/subsidiary/useSubsidiaries";
import useSubsidiariesMutations from "@dashboard/modules/config/composables/subsidiary/useSubsidiariesMutations";
import { watch } from "vue";
import SubsidiariesTableList from "../../component/subsidiary/SubsidiariesTableList.vue";
import type { Subsidiary } from "../../models/Subsidiary";
import ConfirmDeleteDialog from "@/modules/dashboard/components/shared/ConfirmDeleteDialog.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { subsidiaries } = useSubsidiaries();
const { deleteSubsidiaryMutations } = useSubsidiariesMutations();

const showConfirmDialog = ref(false);
const selectedSubsidiary = ref<Subsidiary>({} as Subsidiary);
const router = useRouter();

const onDelete = (subsidiary: Subsidiary) => {
  selectedSubsidiary.value = subsidiary;
  showConfirmDialog.value = true;
};

const onConfirmResponseHandler = (response: boolean) => {
  if (response) {
    deleteSubsidiaryMutations.mutate(selectedSubsidiary.value.id);
  }
  showConfirmDialog.value = false;
};

const onSelect = (subsidiary: Subsidiary) => {
  router.push({
    name: "config-subsidiary-update",
    params: { id: subsidiary.id },
  });
};

watch(deleteSubsidiaryMutations.isError, () => {
  if (deleteSubsidiaryMutations.isError.value) {
    alert("bad");
  }
});

watch(deleteSubsidiaryMutations.isSuccess, () => {
  if (deleteSubsidiaryMutations.isSuccess.value) {
    subsidiaries.value = subsidiaries.value.filter(
      (x) => x.id != deleteSubsidiaryMutations.variables.value
    );
  }
});
</script>

<template>
  <ViewScaffold>
    <template #default>
      <div>
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-2">
          <p class="tw-font-semibold tw-text-gray-400">Todas las sucursales</p>
          <RouterLink :to="{ name: 'config-subsidiary-add' }">
            <v-btn flat color="success" prepend-icon="mdi-plus">Nueva</v-btn>
          </RouterLink>
        </div>
        <SubsidiariesTableList
          :is-delete-loading="deleteSubsidiaryMutations.isPending.value"
          :is-update-loading="false"
          @subsidiary-delete="onDelete"
          @subsidiary-update="onSelect"
        />

        <ConfirmDeleteDialog
          :show-modal="showConfirmDialog"
          :dialog-text="'Esta seguro que desea borrar la sucursal?'"
          :title="'Desea borrar'"
          @confirm-response="onConfirmResponseHandler"
        />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
