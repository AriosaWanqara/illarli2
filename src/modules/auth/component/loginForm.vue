<script setup lang="ts">
import logo from "@/assets/logo/LOGO-ILLARLI-Sistema-de-facturación.png";
import { useUserStore } from "@/stores/userStore";
import type { AxiosError } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";

const { loginStore } = useUserStore();
const router = useRouter();

const email = ref();
const password = ref();
const visible = ref(false);

const { signInMutation } = useAuth();
const onSignInSubmit = () => {
  signInMutation.mutate({ email: email.value, password: password.value });
};

watch(signInMutation.isError, () => {
  if (signInMutation.isError.value) {
    let x = signInMutation.error.value as AxiosError;
    alert(JSON.stringify(x.response?.data));
  }
});

watch(signInMutation.isSuccess, () => {
  if (signInMutation.isSuccess.value) {
    let x = signInMutation.data.value;
    loginStore(x!);
    router.push({ name: "dashboard-home" });
  }
});
</script>

<template>
  <div
    class="tw-h-full tw-min-w-full md:tw-min-w-[500px] tw-bg-white tw-px-5 md:tw-px-10 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-200"
  >
    <div class="tw-flex tw-flex-col tw-w-full tw-gap-4 tw-items-center">
      <header class="tw-text-center tw-w-7/12">
        <VImg :src="logo" height="43" class="tw-mb-5" />
        <p class="tw-text-gray-400">
          Ingresa a tu cuent
          <span class="text-bg-primary tw-font-semibold tw-font-Noto"
            >Illarli</span
          >
          para un control total
        </p>
      </header>
      <div class="tw-flex tw-gap-2 tw-items-center tw-w-full tw-justify-center">
        <VDivider />
        <p class="tw-shrink-0 tw-text-sm tw-text-gray-400">
          Inicia sesion con tu email
        </p>
        <VDivider />
      </div>
      <form action="" @submit.prevent="onSignInSubmit">
        <VRow>
          <VCol cols="12">
            <div class="tw-flex tw-flex-col tw-gap-1">
              <label
                for="username"
                class="tw-text-[10px] 2xl:tw-text-xs tw-text-gray-400"
                >EMAIL</label
              >
              <VTextField
                placeholder="email@gmail.com"
                variant="solo-filled"
                prepend-inner-icon="mdi-account-outline"
                v-model="email"
              />
            </div>
          </VCol>
          <VCol cols="12">
            <div class="tw-flex tw-flex-col tw-gap-1">
              <label
                for="username"
                class="tw-text-[10px] 2xl:tw-text-xs tw-text-gray-400"
                >CONTRASEÑA</label
              >
              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="********"
                prepend-inner-icon="mdi-lock-outline"
                variant="solo-filled"
                v-model="password"
                @click:append-inner="visible = !visible"
              ></v-text-field>
            </div>
          </VCol>
          <VCol cols="12">
            <div class="tw-flex tw-justify-end">
              <p class="tw-text-gray-400">
                No tienes contraseña?
                <span class="tw-font-semibold text-bg-primary tw-cursor-pointer"
                  >recuperar</span
                >
              </p>
            </div>
          </VCol>
          <VCol cols="12">
            <VBtn
              color="primary"
              block
              variant="flat"
              density="default"
              type="submit"
              :loading="signInMutation.isPending.value"
            >
              <p class="tw-font-semibold">INGRESAR</p>
            </VBtn>
          </VCol>
        </VRow>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
