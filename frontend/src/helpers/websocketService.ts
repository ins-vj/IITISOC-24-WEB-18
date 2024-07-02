import { getChannelsUUID } from "@/helpers/auth";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_WS_URL;

class SocketService {
  public socket!: WebSocket;
  private meetId: string;
  public secret_key!: string;
  public uuid!: string;
  public setUsers!: (users: [any]) => void;
  public setEmotion!: (emotion: any) => void;

  constructor(meetId: string) {
    this.meetId = meetId;
  }

  newSocket = async () => {
    const uuid = await getChannelsUUID();
    this.uuid = uuid;
    console.log(`${BASE_URL}/ws/messagesio/meet/?uuid=${uuid}`);
    this.socket = new WebSocket(`${BASE_URL}/ws/messagesio/meet/?uuid=${uuid}`);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.socket.send(
        JSON.stringify({
          id: this.meetId,
          action: "join_meet",
          request_id: uuid,
        })
      );
    };

    this.socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.socket.onclose = (e: any) => {
      console.log("Chat socket closed unexpectedly");
    };
  };

  handleMessage(data: any) {
    console.log("message received");
    switch (data.type) {
      case "update_users":
        console.log("Updated users:", data.usuarios);
        this.setUsers(data.usuarios);
        break;
      case "update_emotion_users":
        console.log("Updated emotion:", data);
        break;
      case "message":
        console.log("Message:", data.message);
      
        break;
      case "secret_key":
        this.secret_key = data.secret_key;
        console.log("secret_key: ", data.secret_key);
        break;
      default:
        console.log("Unknown message type:", data);
    }
  }

  updateClientId() {
    console.log("update client");
    const msg = {
      action: "update_clientid",
      client_id: this.uuid,
      request_id: this.uuid,
    };
    this.socket.send(JSON.stringify(msg));
  }

  updateUserEmotion(emotion: string) {
    console.log("update emotion");
    console.log(emotion);
    const msg = {
      action: "update_emotion",
      emotion: emotion,
      request_id: this.uuid,
    };
    this.socket.send(JSON.stringify(msg));
  }

  sendText(message: string) {
    const msg = {
      action: "create_message",
      message: message,
      request_id: this.uuid,
    };
    this.socket.send(JSON.stringify(msg));
  }
}

export default SocketService;
