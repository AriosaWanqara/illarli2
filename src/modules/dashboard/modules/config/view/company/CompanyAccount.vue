<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCompanyConfigsMutations from "../../composables/company/useCompanyConfigsMutations";
import useCompany from "../../composables/company/useCompany";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";

const {
  companyConfigs,
  companyConfigsHasError,
  isCompanyConfigsLoading,
  staleData,
  staleDomain,
} = useCompany();
const { updateCompanyConfigsMutations, updateCompanyConfigsDomainMutations } =
  useCompanyConfigsMutations();
const { logout } = useUserStore();

const onUpdateConfig = () => {
  updateCompanyConfigsMutations.mutate(companyConfigs.value);
};

const onDomainValidate = () => {
  updateCompanyConfigsDomainMutations.mutate({
    subDomainToVerify: companyConfigs.value.domain,
  });
};

watch(updateCompanyConfigsMutations.isError, () => {
  if (updateCompanyConfigsMutations.isError.value) {
    let x = updateCompanyConfigsMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
    companyConfigs.value = staleData.value!;
  }
});

watch(updateCompanyConfigsMutations.isSuccess, () => {
  if (updateCompanyConfigsMutations.isSuccess.value) {
    alert("gut");
  }
});

watch(updateCompanyConfigsDomainMutations.isError, () => {
  if (updateCompanyConfigsDomainMutations.isError.value) {
    let x = updateCompanyConfigsDomainMutations.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
    companyConfigs.value = staleData.value!;
  }
});

watch(updateCompanyConfigsDomainMutations.isSuccess, () => {
  if (updateCompanyConfigsDomainMutations.isSuccess.value) {
    if (updateCompanyConfigsDomainMutations.data.value == "1") {
      logout();
      window.location.href = `http://${updateCompanyConfigsDomainMutations.variables.value?.subDomainToVerify}.localhost:5173/Login`;
    } else {
      alert("noup");
    }
  }
});
</script>

<template>
  <ViewScaffold title="Mis datos">
    <VRow v-if="isCompanyConfigsLoading">
      <p>cargando..</p>
    </VRow>
    <VRow v-else-if="companyConfigsHasError">
      <p>cargando..</p>
    </VRow>
    <VRow v-else class="mt-1">
      <VCol cols="6" class="py-1">
        <VTextField label="email" v-model="companyConfigs.email" />
      </VCol>
      <VCol cols="6" class="py-1">
        <VTextField label="phone" v-model="companyConfigs.phone" />
      </VCol>
      <VCol cols="6" class="py-1">
        <VTextField label="address" v-model="companyConfigs.address" />
      </VCol>
      <VCol cols="6" class="py-1">
        <VTextField
          label="artisan_resolution"
          v-model="companyConfigs.artisan_resolution"
        />
      </VCol>
      <VCol cols="6" class="py-1">
        <VTextField
          label="withholding_agent_resolution"
          v-model="companyConfigs.withholding_agent_resolution"
        />
      </VCol>
      <VCol cols="6" class="py-1">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="is artisan"
          v-model="companyConfigs.is_artisan"
        ></v-checkbox>
      </VCol>
      <VCol cols="6" class="py-1">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="is_withholding_agent"
          v-model="companyConfigs.is_withholding_agent"
        ></v-checkbox>
      </VCol>
      <VCol cols="6" class="py-1">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="is_force_accounting"
          v-model="companyConfigs.is_force_accounting"
        ></v-checkbox>
      </VCol>
      <VCol cols="6" class="py-1">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="is_rimpe"
          v-model="companyConfigs.is_rimpe"
        ></v-checkbox>
      </VCol>
      <VCol cols="6" class="py-1">
        <VTextField label="domain" v-model="companyConfigs.domain">
          <template #append-inner>
            <VBtn
              @click="onDomainValidate"
              :disabled="staleDomain == companyConfigs.domain"
              >validar</VBtn
            >
          </template>
        </VTextField>
      </VCol>
      <VCol cols="12">
        <VBtn @click="onUpdateConfig"> crear </VBtn>
      </VCol>
    </VRow>
  </ViewScaffold>
</template>

<style scoped></style>
