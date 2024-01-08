<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import useCompanyConfigsMutations from "../../composables/company/useCompanyConfigsMutations";
import useCompany from "../../composables/company/useCompany";
import { watch } from "vue";
import type { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import { Icon } from "@iconify/vue";

const {
  companyConfigs,
  companyConfigsHasError,
  isCompanyConfigsLoading,
  staleData,
} = useCompany();
const { updateCompanyConfigsMutations, updateCompanyConfigsDomainMutations } =
  useCompanyConfigsMutations();
const { logout } = useUserStore();

const onUpdateConfig = () => {
  updateCompanyConfigsMutations.mutate(companyConfigs.value);
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
  <ViewScaffold>
    <VRow v-if="isCompanyConfigsLoading">
      <p>cargando..</p>
    </VRow>
    <VRow v-else-if="companyConfigsHasError">
      <p>cargando..</p>
    </VRow>
    <VRow v-else>
      <VCol cols="12" md="6">
        <div class="tw-flex tw-gap-1 tw-items-center">
          <Icon icon="ic:baseline-event-repeat" height="24" />
          <p>
            Proxima renovacion :
            <span class="tw-font-semibold">
              {{ moment(companyConfigs.expiration_date).format("YYYY-MM-DD") }}
            </span>
          </p>
        </div>
      </VCol>
      <VCol cols="12" md="6"></VCol>

      <VCol cols="12" md="6" class="py-0 tw-mt-4">
        <VTextField label="Correo empresarial" v-model="companyConfigs.email" />
      </VCol>
      <VCol cols="12" md="6" class="py-0 md:tw-mt-4">
        <VTextField
          label="Telefono empresarial"
          v-model="companyConfigs.phone"
        />
      </VCol>
      <VCol cols="12" class="py-0">
        <VTextField
          label="Direccion empresarial"
          v-model="companyConfigs.address"
        />
      </VCol>
      <VCol cols="6" class="py-0">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="Eres artesano?"
          v-model="companyConfigs.is_artisan"
        ></v-checkbox>
      </VCol>
      <VCol cols="6" class="py-0">
        <VTextField
          label="Resolucion de artesano"
          :disabled="!companyConfigs.is_artisan"
          v-model="companyConfigs.artisan_resolution"
        />
      </VCol>
      <VCol cols="6" class="py-0">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="Eres agente de retencion?"
          v-model="companyConfigs.is_withholding_agent"
        ></v-checkbox>
      </VCol>
      <VCol cols="6" class="py-0">
        <VTextField
          label="Resolucion de agente"
          :disabled="!companyConfigs.is_withholding_agent"
          v-model="companyConfigs.withholding_agent_resolution"
        />
      </VCol>
      <VCol cols="6" class="py-0">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="Llevas contabilidad?"
          v-model="companyConfigs.is_force_accounting"
        ></v-checkbox>
      </VCol>
      <VCol cols="6" class="py-0">
        <v-checkbox
          :true-value="1"
          :false-value="0"
          label="Eres rimpe?"
          v-model="companyConfigs.is_rimpe"
        ></v-checkbox>
      </VCol>
      <VCol cols="12" class="py-0">
        <v-divider></v-divider>
      </VCol>
      <VCol cols="12" class="py-0 tw-mt-1">
        <h1 class="tw-text-lg tw-px-1">Configuracion firma electronica</h1>
      </VCol>
      <VCol cols="12" md="6">
        <div class="tw-flex tw-gap-1 tw-h-full">
          <Icon icon="mdi:card-account-details" height="20" />
          <p>
            Válida hasta:
            <span class="tw-font-semibold">
              {{ companyConfigs.sign_expiration_date ?? "2025/04/06 08:16" }}
            </span>
          </p>
        </div>
      </VCol>
      <VCol cols="12" md="6">
        <v-file-input
          clearable
          label="Firma electronica"
          variant="outlined"
          density="compact"
          prepend-icon=""
        >
          <template #prepend-inner>
            <Icon icon="mdi:file-document-plus-outline" height="20" />
          </template>
        </v-file-input>
      </VCol>
      <VCol cols="12">
        <VBtn @click="onUpdateConfig"> GUARDAR </VBtn>
      </VCol>
    </VRow>
  </ViewScaffold>
</template>

<style scoped></style>
