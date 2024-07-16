import express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { WebSocketConnection } from "./lib/ws";

const main = () => {
  const app = express();
  const server = http.createServer(app);

  //@ts-ignore
  const webSocket = new WebSocket.Server({ server, path: "/ws" });

  WebSocketConnection(webSocket);

  const port = 4444;

  server.listen(port, () => {
    console.log("Server started at port ", port);
  });
};

export { main };
