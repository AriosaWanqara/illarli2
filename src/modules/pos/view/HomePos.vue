<script setup lang="ts">
import useBalanceReader from "../composables/server/useBalanceReader";

const { connectToBalance, disconnect, balanceMessage } = useBalanceReader();

const connect = () => {
  connectToBalance();
};
</script>

<template>
  <div>
    <h1>pos</h1>
    <RouterLink :to="{ name: 'dashboard-home' }">
      <VBtn>go back</VBtn>
    </RouterLink>
    <VBtn @click="connect">connect</VBtn>
    <VBtn @click="disconnect">disconnect</VBtn>
    <div
      class=""
      v-if="balanceMessage.length > 0"
      v-for="response in balanceMessage"
    >
      <div class="tw-flex tw-gap-2">
        <p>nombre {{ response.balance.name }}</p>
        <p>{{ response.balance.balanceType.name }}</p>
        <p>{{ response.disconnectTime }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
