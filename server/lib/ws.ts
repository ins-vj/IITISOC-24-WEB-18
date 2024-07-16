import {
  Consumer,
  Producer,
  Router,
  RtpCapabilities,
  Transport,
  Worker,
} from "mediasoup/node/lib/types";
import { createWorker } from "./worker";
import WebSocket from "ws";
import { createWebRTCTransport } from "./createWebRTCtransport";

let worker: Worker;
let mediasoupRouter: Router;
let producerTransport: Transport;
let consumerTransport: Transport;
let producer: Producer;
let consumer: Consumer;

const WebSocketConnection = async (websock: WebSocket.Server) => {
  try {
    ({ mediasoupRouter, worker } = await createWorker());
  } catch (error) {
    throw error;
  }

  websock.on("connection", (ws: WebSocket) => {
    ws.on("message", async (data: any) => {
      const jsonValidation = isJson(data);
      if (!jsonValidation) {
        console.error("Not JSON");
        return;
      }

      const event = JSON.parse(data);

      console.log(event);

      switch (event.type) {
        case "consume":
          await onConsume(event, ws);
          break;
        case "getRouterRtpCapabilities":
          onRouterRtpCapabilities(event, ws);
          break;
        case "createProducerTransport":
          await onCreateProducerTransport(event, ws);
          break;
        case "connectProducerTransport":
          await onConnectProducerTransport(event, ws);
          break;
        case "produce":
          await onProduce(event, ws, websock);
          break;
        case "createConsumerTransport":
          await oncreateConsumerTransport(event, ws);
          break;
        case "connectConsumerTransport":
          await onConnectConsumerTransport(event, ws);
          break;
        case "resume":
          await onResume(ws);
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
        mediasoupRouter,
        worker
      );
      producerTransport = transport;
      send(ws, "producerTransportCreated", params);
    } catch (error) {
      console.error(error);
      ws.send(`error: ${error}`);
    }
  };

  const oncreateConsumerTransport = async (event: any, ws: WebSocket) => {
    try {
      const { transport, params } = await createWebRTCTransport(
        mediasoupRouter,
        worker
      );
      consumerTransport = transport;
      send(ws, "subtransportCreated", params);
    } catch (error) {
      console.log(error);
    }
  };

  const onConnectConsumerTransport = async (event: any, ws: WebSocket) => {
    await consumerTransport.connect({ dtlsParameters: event.dtlsParameters });
    send(ws, "subConnected", "consumer transport connected");
  };

  const onResume = async (ws: WebSocket) => {
    await consumer.resume();
    send(ws, "resumed", "resumed");
  };

  const onConsume = async (event: any, ws: WebSocket) => {
    console.log("onConsume data:", event);
    const res = await createConsumer(producer, event.rtpCapabilities);
    send(ws, "subscribed", res);
  };

  const onConnectProducerTransport = async (event: any, ws: WebSocket) => {
    console.log("connect event: ", event);
    await producerTransport.connect({
      dtlsParameters: event.dtlsParameters,
      transportId: event.transportId,
      iceCandidates: producerTransport,
    });
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

  const createConsumer = async (
    producer: Producer,
    rtpCapabilities: RtpCapabilities
  ) => {
    console.log("create consumer data: ", {
      producerId: producer.id,
      rtpCapabilities,
    });
    if (
      !mediasoupRouter.canConsume({ producerId: producer.id, rtpCapabilities })
    ) {
      console.log("Cannot consume!");
      return;
    }

    console.log({
      producerId: producer.id,
      rtpCapabilities: rtpCapabilities,
      paused: producer.kind === "video",
    });

    try {
      consumer = await consumerTransport.consume({
        producerId: producer.id,
        rtpCapabilities: rtpCapabilities,
        paused: producer.kind === "video",
      });
    } catch (error) {
      console.error("consume failed: ", error);
      return;
    }

    console.log("this is consumer: ", consumer);

    return {
      producerId: producer.id,
      id: consumer.id,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
      type: consumer.type,
      producerPaused: consumer.producerPaused,
    };
  };
};

export { WebSocketConnection };
