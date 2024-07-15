import { Producer, Router, Transport } from "mediasoup/node/lib/types";
import { createWorker } from "./worker";
import WebSocket from "ws";
import { createWebRTCTransport } from "./createWebRTCtransport";
import { DtlsParameters } from "mediasoup/node/lib/fbs/web-rtc-transport";

let mediasoupRouter: Router;
let producerTransport: Transport;
let producer: Producer;

const WebSocketConnection = async (websock: WebSocket.Server) => {
  try {
    mediasoupRouter = await createWorker();
  } catch (error) {
    throw error;
  }

  websock.on("connection", (ws: WebSocket) => {
    ws.on("message", (data: any, isBinary) => {
      const jsonValidation = isJson(data);
      if (!jsonValidation) {
        console.error("Not JSON");
        return;
      }

      const event = JSON.parse(data);

      console.log(event);

      switch (event.type) {
        case "getRouterRtpCapabilities":
          onRouterRtpCapabilities(event, ws);
          break;
        case "createProducerTransport":
          onCreateProducerTransport(event, ws);
          break;
        case "connectProducerTransport":
          onConnectProducerTransport(event, ws);
          break;
        case "produce":
          onProduce(event, ws, websock);
          break;
        default:
          console.log(event);
      }
    });
  });

  const isJson = (str: string) => {
    try {
      JSON.parse(str);
    } catch (error) {
      return false;
    }
    return true;
  };

  const onRouterRtpCapabilities = (event: string, ws: WebSocket) => {
    send(ws, "routerCapabilities", mediasoupRouter.rtpCapabilities);
  };

  const onCreateProducerTransport = async (event: any, ws: WebSocket) => {
    try {
      const { transport, params } = await createWebRTCTransport(
        mediasoupRouter
      );
      producerTransport = transport;
      send(ws, "ProducerTransportCreated", params);
    } catch (error) {
      console.error(error);
      ws.send(`error: ${error}`);
    }
  };

  const onConnectProducerTransport = async (event: any, ws: WebSocket) => {
    await producerTransport.connect({ DtlsParameters: event.dtlsParameters });
    send(ws, "producerConnected", "producer connected!");
  };

  const onProduce = async (
    event: any,
    ws: WebSocket,
    websocket: WebSocket.Server
  ) => {
    const { kind, rtpParameters } = event;
    producer = await producerTransport.produce({ kind, rtpParameters });
    const resp = {
      id: producer.id,
    };
    send(ws, "produced", resp);
    broadcast(websocket, "newProducer", "new user");
  };

  const send = (ws: WebSocket, type: string, message: any) => {
    const msg = {
      type,
      data: message,
    };

    const resp = JSON.stringify(msg);
    ws.send(resp);
  };

  const broadcast = (ws: WebSocket.Server, type: string, msg: any) => {
    const resp = JSON.stringify({
      type,
      data: msg,
    });
    ws.clients.forEach((client) => {
      client.send(resp);
    });
  };
};

export { WebSocketConnection };
