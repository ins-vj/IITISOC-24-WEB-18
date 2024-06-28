import { getChannelsUUID } from "@/helpers/auth";

const newSocket = async ({ roomId }: { roomId: string }) => {
  const uuid = await getChannelsUUID();
  const w1 = new WebSocket(
    `ws://localhost:8000/ws/messagesio/room/?uuid=${uuid}`
  );

  w1.onopen = function () {
    console.log("WebSocket connected");
    const startSocket = async () => {
      await w1.send(
        JSON.stringify({
          pk: roomId,
          action: "join_room",
          request_id: uuid,
        })
      );
    };
    startSocket();
  };

  w1.onclose = function (e: any) {
    console.log("Chat socket closed unexpectedly");
  };

  return w1;
};

// newSocket();

function sendText(socket: WebSocket, message: string, uuid: string) {
  const msg = {
    action: "create_message",
    message: message,
    request_id: uuid,
  };
  socket.send(JSON.stringify(msg));
}
