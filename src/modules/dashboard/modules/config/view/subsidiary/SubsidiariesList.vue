<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useSubsidiaries from "@dashboard/modules/config/composables/subsidiary/useSubsidiaries";
import useSubsidiariesMutations from "@dashboard/modules/config/composables/subsidiary/useSubsidiariesMutations";
import { watch } from "vue";

const { isSubsidiariesLoading, subsidiaries, subsidiariesHasError } =
  useSubsidiaries();
const { deleteSubsidiaryMutations } = useSubsidiariesMutations();

const onDelete = (id: string) => {
  deleteSubsidiaryMutations.mutate(id);
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
  <ViewScaffold title="Sucursales">
    <template #action>
      <RouterLink :to="{ name: 'config-subsidiary-add' }">
        <v-btn flat color="success"
          ><PlusIcon size="18" class="mr-2" />Agregar</v-btn
        >
      </RouterLink>
    </template>
    <template #default>
      <p v-if="isSubsidiariesLoading">cargando..</p>
      <p v-else-if="subsidiariesHasError">error</p>
      <div v-else v-for="subsidiary in subsidiaries">
        {{ subsidiary.id }}
        {{ subsidiary.businessname }}
        <RouterLink
          :to="{
            name: 'config-subsidiary-update',
            params: { id: subsidiary.id },
          }"
        >
          <VBtn>Modificar</VBtn>
        </RouterLink>
        <VBtn
          @click="onDelete(subsidiary.id)"
          :loading="deleteSubsidiaryMutations.isPending.value"
          >Eliminar</VBtn
        >
        <br />
        <br />
      </div>
    </template>
  </ViewScaffold>
</template>

<style scoped></style>
