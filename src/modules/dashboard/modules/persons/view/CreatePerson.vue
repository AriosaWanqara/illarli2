<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import PersonSelectorForm from "../components/PersonSelectorForm.vue";
import CreatePersonForm from "../components/createPersonForm.vue";
import useClientsMutations from "../composables/client/useClientsMutations";
import usePersonValidator from "../composables/usePersonValidator";
import { personRolEnum } from "../constant/personRolEnum";
import type { Provider } from "../models/Provider";

const { saveClientMutations } = useClientsMutations();
const { person: personToValidate, personValidator } = usePersonValidator();
const router = useRouter();

const person = ref<Provider>({
  phones: [] as string[],
  emails: [] as string[],
  roles: [personRolEnum.CUSTOMER],
} as Provider);

watch(
  person,
  () => {
    personToValidate.value = person.value;
  },
  { deep: true }
);

const onClientSubmit = (personToSave: Provider) => {
  if (personToSave) {
    saveClientMutations.mutate(personToSave);
  } else {
    personValidator.value.$validate();
  }
};

watch(saveClientMutations.isError, () => {
  if (saveClientMutations.isError.value) {
  }
});

watch(saveClientMutations.isSuccess, () => {
  if (saveClientMutations.isSuccess.value) {
    router.push({ name: "client-list" });
  }
});
</script>

<template>
  <div class="tw-flex tw-gap-x-3 tw-flex-wrap md:tw-flex-row tw-flex-col">
    <PersonSelectorForm
      class="md:tw-max-w-[446px] tw-h-min"
      :person="person"
      :name-error="
        personValidator.name.$errors.map((x) => x.$message.toString())
      "
      :identity-error="
        personValidator.identity.$errors.map((x) => x.$message.toString())
      "
    />
    <div class="tw-flex-1">
      <ViewScaffold>
        <CreatePersonForm
          :is-loading="saveClientMutations.isPending.value"
          :form-button-text="'Guardar'"
          :person="person"
          show-extra
          @person-submit="onClientSubmit"
        />
      </ViewScaffold>
    </div>
  </div>
</template>

<style scoped></style>
