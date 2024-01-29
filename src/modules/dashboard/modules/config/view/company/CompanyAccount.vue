<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { AxiosError } from "axios";
import moment from "moment";
import { watch } from "vue";
import useCompany from "../../composables/company/useCompany";
import useCompanyConfigsMutations from "../../composables/company/useCompanyConfigsMutations";
import UIParentCardV2 from "@/modules/dashboard/components/shared/UIParentCardV2.vue";
import employeeImg from "@dashboard/assets/images/ic_employee.png";
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";
import FormListContainer from "@/modules/dashboard/components/shared/FormListContainer.vue";
import ButtonFileUploader from "@/modules/dashboard/components/shared/ButtonFileUploader.vue";
import CompanyAccountLoading from "../../component/company/CompanyAccountLoading.vue";
import CompanyServerError from "../../component/company/CompanyServerError.vue";
const {
  companyConfigs,
  companyConfigsHasError,
  isCompanyConfigsLoading,
  staleData,
} = useCompany();
const { updateCompanyConfigsMutations } = useCompanyConfigsMutations();

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
</script>

<template>
  <div class="tw-h-full" v-auto-animate>
    <div v-if="isCompanyConfigsLoading" class="tw-h-full">
      <CompanyAccountLoading />
    </div>
    <div v-else-if="companyConfigsHasError" class="tw-h-full">
      <CompanyServerError />
    </div>
    <div v-else class="">
      <FormListContainer>
        <template #form>
          <UIParentCardV2>
            <template #title>
              <div class="tw-h-[100px]">
                <div
                  class="tw-relative bg-secondary tw-h-[68px] tw-flex tw-overflow-visible tw-justify-center"
                >
                  <img
                    :src="employeeImg"
                    alt=""
                    class="tw-absolute -tw-top-1"
                  />
                </div>
              </div>
            </template>
            <template #default>
              <div class="tw-p-4">
                <header class="tw-flex tw-justify-center">
                  <div class="tw-flex tw-gap-1 tw-items-center">
                    <Icon icon="ic:baseline-event-repeat" height="24" />
                    <p class="title-1">
                      Proxima renovacion :
                      <span class="tw-font-semibold">
                        {{
                          moment(companyConfigs.expiration_date).format(
                            "YYYY-MM-DD"
                          )
                        }}
                      </span>
                    </p>
                  </div>
                </header>
                <FormSeccion title="Informacion general" border class="tw-mt-6">
                  <VRow>
                    <VCol cols="12" class="py-1">
                      <InputSection label-message="Correo empresarial">
                        <VTextField
                          placeholder="Correo empresarial"
                          v-model="companyConfigs.email"
                        />
                      </InputSection>
                    </VCol>
                    <VCol cols="12" class="py-1">
                      <InputSection label-message="Telefono empresarial">
                        <VTextField
                          placeholder="telefono"
                          v-model="companyConfigs.phone"
                        />
                      </InputSection>
                    </VCol>
                    <VCol cols="12" class="py-1">
                      <InputSection label-message="Direccion empresarial">
                        <VTextarea
                          placeholder="Correo empresarial"
                          hide-details
                          v-model="companyConfigs.address"
                        />
                      </InputSection>
                    </VCol>
                  </VRow>
                </FormSeccion>
              </div>
            </template>
          </UIParentCardV2>
        </template>
        <template #default>
          <UIParentCardV2>
            <template #default>
              <div class="tw-px-5 tw-py-6">
                <FormSeccion title="Informacion tributaria" border>
                  <VRow>
                    <VCol cols="12" class="py-1">
                      <div class="tw-flex tw-gap-3 tw-items-end">
                        <v-checkbox
                          :true-value="1"
                          :false-value="0"
                          hide-details
                          density="compact"
                          class="grow-0"
                          label="Eres artesano?"
                          v-model="companyConfigs.is_artisan"
                        />
                        <InputSection
                          label-message="Resolucion de artesano"
                          class="tw-flex-1 tw-max-w-[300px]"
                        >
                          <VTextField
                            label="Resolucion de artesano"
                            :disabled="!companyConfigs.is_artisan"
                            v-model="companyConfigs.artisan_resolution"
                          />
                        </InputSection>
                      </div>
                    </VCol>
                    <VCol cols="12" class="py-1">
                      <div class="tw-flex tw-gap-3 tw-items-end">
                        <v-checkbox
                          :true-value="1"
                          :false-value="0"
                          hide-details
                          density="compact"
                          class="grow-0"
                          label="Eres agente de retencion??"
                          v-model="companyConfigs.is_withholding_agent"
                        />
                        <InputSection
                          label-message="Resolucion de artesano"
                          class="tw-flex-1 tw-max-w-[300px]"
                        >
                          <VTextField
                            label="Resolucion de agente"
                            :disabled="!companyConfigs.is_withholding_agent"
                            v-model="
                              companyConfigs.withholding_agent_resolution
                            "
                          />
                        </InputSection>
                      </div>
                    </VCol>
                    <VCol cols="12" class="py-1">
                      <div class="tw-flex tw-gap-3 tw-items-end">
                        <v-checkbox
                          :true-value="1"
                          :false-value="0"
                          label="Llevas contabilidad?"
                          hide-details
                          density="compact"
                          class="grow-0"
                          v-model="companyConfigs.is_force_accounting"
                        ></v-checkbox>
                        <v-checkbox
                          :true-value="1"
                          :false-value="0"
                          label="Eres rimpe?"
                          hide-details
                          density="compact"
                          class="grow-0"
                          v-model="companyConfigs.is_rimpe"
                        ></v-checkbox>
                      </div>
                    </VCol>
                  </VRow>
                </FormSeccion>
                <FormSeccion title="Firma electronica" border>
                  <VRow>
                    <VCol cols="12" md="6">
                      <div class="tw-flex tw-gap-1 tw-h-full tw-items-center">
                        <Icon icon="mdi:card-account-details" height="20" />
                        <p>
                          Válida hasta:
                          <span class="tw-font-semibold">
                            {{
                              companyConfigs.sign_expiration_date ??
                              "2025/04/06 08:16"
                            }}
                          </span>
                        </p>
                      </div>
                    </VCol>
                    <VCol cols="12">
                      <ButtonFileUploader
                        variant="flat"
                        color="info"
                        buttonText="cargar firma nueva"
                        appendIcon=""
                        prependIcon="mdi-upload"
                        :isButtonLoading="false"
                        accept=""
                      />
                    </VCol>
                    <VCol cols="12">
                      <div class="tw-flex tw-justify-end">
                        <VBtn
                          @click="onUpdateConfig"
                          color="success"
                          density="default"
                          prepend-icon="mdi-plus"
                        >
                          GUARDAR
                        </VBtn>
                      </div>
                    </VCol>
                  </VRow>
                </FormSeccion>
              </div>
            </template>
          </UIParentCardV2>
        </template>
      </FormListContainer>
    </div>
  </div>
</template>

<style scoped>
.grow-0 {
  flex-grow: 0 !important;
}
</style>
