<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const router = useRouter();
const { logout } = useUserStore();

const closeSession = () => {
  logout();
  router.push({ name: "auth-login" });
};
</script>

<template>
  <VCard>
    <VCardText>
      <div class="mx-auto tw-text-center">
        <v-avatar color="brown">
          <span class="text-h5">JL</span>
        </v-avatar>
        <h3>Jose Luis</h3>
        <p class="text-caption mt-1">jose@gmail.com</p>
        <v-divider class="my-3"></v-divider>
        <v-btn rounded variant="text"> Edit Account </v-btn>
        <v-divider class="my-3"></v-divider>
        <v-btn rounded variant="text" @click="closeSession"> Disconnect </v-btn>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped></style>
