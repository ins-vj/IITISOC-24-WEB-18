"use client";
import React, { useEffect, useState } from "react";
import { getChannelsUUID } from "@/helpers/auth";

const ChatApp = ({ params }: { params: { roomId: string } }) => {
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>(params.roomId);
  const [messaages, setMessages] = useState<any>();
  const [socket, setSocket] = useState<WebSocket>();
  const [requestId, useRequestId] = useState(Math.floor(Math.random() * 10000));

  useEffect(() => {
    const newSocket = async () => {
      const uuid = await getChannelsUUID();
      const w1 = new WebSocket(
        `ws://localhost:8000/ws/messagesio/room/?uuid=${uuid}`
      );

      w1.onopen = function () {
        console.log("connected");
        const startSocket = async () => {
          await w1.send(
            JSON.stringify({
              pk: params.roomId,
              action: "join_room",
              request_id: requestId,
            })
          );
          await w1.send(
            JSON.stringify({
              pk: params.roomId,
              action: "retrieve",
              request_id: requestId,
            })
          );
          await w1.send(
            JSON.stringify({
              pk: params.roomId,
              action: "subscribe_to_messages_in_room",
              request_id: requestId,
            })
          );
          await w1.send(
            JSON.stringify({
              pk: params.roomId,
              action: "subscribe_instance",
              request_id: requestId,
            })
          );
        };
        startSocket();
      };

      w1.onmessage = function (e: any) {
        const data = JSON.parse(e.data);
        switch (data.action) {
          case "retrieve":
            setRoom((old) => data.data);
            setMessages(data.data.messages);
            break;
          case "create":
            // setMessages((prev: any) => [...prev, data]);
            break;
          default:
            break;
        }
      };

      w1.onclose = function (e: any) {
        console.log("Chat socket closed unexpectedly");
      };

      setSocket(w1);
    };
    newSocket();
  }, []);

  function sendText() {
    const msg = {
      action: "create_message",
      message: message,
      request_id: requestId,
    };
    socket!.send(JSON.stringify(msg));

    console.log(messaages);
    console.log(room);

    setMessage("");
  }

  return (
    <div className="p-8">
      <div className="bg-black text-white text-lg">{messaages}</div>
      <br />
      <input
        id="chat-message-input"
        autoFocus
        value={message}
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        type="text"
        className="text-black"
        size={100}
      />
      <br />
      <input
        id="chat-message-submit"
        type="button"
        value="Send"
        onClick={sendText}
      />
    </div>
  );
};

export default ChatApp;
