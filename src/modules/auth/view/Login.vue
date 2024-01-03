<script setup lang="ts">
import useAuth from "@auth/composables/useAuth";
import { useUserStore } from "@/stores/userStore";
import type { AxiosError } from "axios";
import { watch } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "../component/loginForm.vue";
import Welcome from "../component/welcome.vue";

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
  <div class="tw-h-screen tw-w-full tw-flex">
    <Welcome class="md:tw-flex tw-hidden" />
    <LoginForm />
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
}
</style>
