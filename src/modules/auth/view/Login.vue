<script setup lang="ts">
import useAuth from "@auth/composables/useAuth";
import { useUserStore } from "@/stores/userStore";
import type { AxiosError } from "axios";
import { watch } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { loginStore } = useUserStore();
const router = useRouter();

const email = ref();
const password = ref();

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
    console.log(x);

    router.push({ name: "product-list" });
  }
});
</script>

<template>
  <div class="h-screen w-100 d-flex justify-center align-center">
    <VCard class="login">
      <form @submit.prevent="onSignInSubmit">
        <VCardItem>
          <VRow>
            <VCol cols="12" class="pb-0">
              <VTextField label="username" v-model="email" />
            </VCol>
            <VCol cols="12" class="py-1">
              <VTextField label="password" v-model="password" />
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions>
          <VBtn type="submit" :loading="signInMutation.isPending.value">
            login
          </VBtn>
        </VCardActions>
      </form>
    </VCard>
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
}
</style>
