import { Client } from "@stomp/stompjs";
import { ref } from "vue";
import type { balanceRead } from "../../model/websocket/WebSocketResponse";

const client = new Client({
  brokerURL: "ws://localhost:8085/ws",
});

const balanceMessage = ref<balanceRead[]>([]);
const isCloserTimeOutDispatched = ref(false);
const isConnectionReady = ref(true);

const connectToBalance = () => {
  client.activate();
  client.onConnect = (_) => {
    isConnectionReady.value = false;
    client.subscribe("/balance/read", (message) => {
      try {
        balanceMessage.value.push(JSON.parse(message.body));
        if (JSON.parse(message.body).disconnectTime) {
          if (!isCloserTimeOutDispatched.value) {
            setTimeout(() => {
              disconnect();
            }, JSON.parse(message.body).disconnectTime * 1000);
          }
          isCloserTimeOutDispatched.value = true;
        }
      } catch (error) {
        console.log(error);
      }
    });
    client.publish({
      destination: "/ws/active",
    });
  };
};

const disconnect = () => {
  isCloserTimeOutDispatched.value = false;
  client.deactivate();
  client.onDisconnect = (_) => {
    isConnectionReady.value = true;
  };
};

const useBalanceReader = () => {
  return {
    balanceMessage,
    isConnectionReady,
    connectToBalance,
    disconnect,
  };
};

export default useBalanceReader;
