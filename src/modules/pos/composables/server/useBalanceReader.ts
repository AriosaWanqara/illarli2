import { Client } from "@stomp/stompjs";
import { ref } from "vue";
import type { balanceRead } from "../../model/websocket/WebSocketResponse";

const client = new Client({
  brokerURL: "ws://localhost:8085/ws",
});

const balanceMessage = ref<balanceRead[]>([]);
const isCloserTimeOutDispatched = ref(false);

const connectToBalance = () => {
  client.activate();
  client.onConnect = (frame) => {
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
};

const useBalanceReader = () => {
  return {
    connectToBalance,
    balanceMessage,
    disconnect,
  };
};

export default useBalanceReader;
