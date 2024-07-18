import {
  Consumer,
  ConsumerType,
  Producer,
  Router,
  RtpCapabilities,
  RtpParameters,
  Transport,
  Worker,
} from "mediasoup/node/lib/types";
import { createWorker } from "./worker";
import WebSocket from "ws";
import { createWebRTCTransport } from "./createWebRTCtransport";
import { v4 as uuidv4 } from "uuid";
import { MediaKind } from "mediasoup/node/lib/fbs/rtp-parameters";
import { User } from "./types";
import { send, broadcast } from "./utils";

let worker: Worker;
let mediasoupRouter: Router;

const users = new Map<string, User>();

const WebSocketConnection = async (websock: WebSocket.Server) => {
  try {
    ({ mediasoupRouter, worker } = await createWorker());
  } catch (error) {
    throw error;
  }

  websock.on("connection", (ws: WebSocket, req: any) => {
    let uuid: string;
    let user: User;

    try {
      uuid = new URL(req.url, "http://localhost").searchParams.get("uuid")!;
      if (!uuid) {
        send(ws, "error", "UUID not provided");
        ws.close();
      }
      console.log("UUID: ", uuid);
    } catch (error) {
      console.log(error);
      return;
    }

    if (!users.has(uuid)) {
      users.set(uuid, {
        uuid: uuid,
        consumers: new Map<string, Consumer>(),
        consumerTransports: new Map(),
      });
    }
    user = users.get(uuid)!;

    ws.on("close", () => {
      broadcast(websock, "userDisconnected", {
        producerId: user.producer && user.producer.id,
      });
      user.consumerTransports &&
        user.consumerTransports?.forEach((consumer) => consumer.close());
      user.producerTransport && user.producerTransport?.close();
      user.producer && user.producer?.close();
      users.delete(uuid);
    });

    ws.on("message", async (data: any) => {
      const jsonValidation = isJson(data);
      if (!jsonValidation) {
        console.error("Not JSON");
        return;
      }

      const event = JSON.parse(data);

      // console.log(event);

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
        case "getUsers":
          await onGetUsers(ws);
          break;

        default:
          console.log(event);
      }
    });

    const onRouterRtpCapabilities = (event: any, ws: WebSocket) => {
      console.log(event);
      user.userData = event.data;
      send(ws, "routerCapabilities", mediasoupRouter.rtpCapabilities);
    };

    const onCreateProducerTransport = async (event: any, ws: WebSocket) => {
      try {
        const { transport, params } = await createWebRTCTransport(
          mediasoupRouter,
          worker
        );
        transport.on("@close", () => {
          user.consumers.forEach((consumer) => {
            consumer.close();
          });
        });
        user.producerTransport = transport;
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
        user.consumerTransports?.set(params.id, transport);
        send(ws, "subtransportCreated", params);
      } catch (error) {
        console.log(error);
      }
    };

    const onConnectConsumerTransport = async (event: any, ws: WebSocket) => {
      console.log("TOCONNECT: ", event);
      await user.consumerTransports?.get(event.transportId)!.connect({
        dtlsParameters: event.dtlsParameters,
      });
      send(ws, "subConnected", "consumer transport connected");
    };

    const onResume = async (ws: WebSocket) => {
      user.consumers.forEach(async (consumer) => {
        try {
          await consumer.resume();
          console.log("Resumed: ", consumer.producerId);
        } catch (error) {
          console.log(error);
        }
      });

      send(ws, "resumed", "resumed");
    };

    const onGetUsers = async (ws: WebSocket) => {
      const userios = Object.fromEntries(users);
      send(ws, "getUsers", userios);
    };

    const onConsume = async (event: any, ws: WebSocket) => {
      console.log("onConsume data:", event);

      // Create an array of promises for each user

      const consumerPromises = Array.from(users.entries()).map(
        async ([key, user1]) => {
          if (key == user.uuid) {
          } else {
            const con1 =
              user1.producer &&
              (await createConsumer(
                user1.producer!,
                event.rtpCapabilities,
                user1.userData!,
                event.transportId
              ));
            if (con1) {
              return con1;
            }
          }
        }
      );

      // Wait for all promises to complete
      const consumerResults = await Promise.all(consumerPromises);

      console.log("ONCONSUME RES: ", consumerResults);
      send(ws, "subscribed", consumerResults);
    };

    const onConnectProducerTransport = async (event: any, ws: WebSocket) => {
      console.log("connect event: ", event);
      await user.producerTransport!.connect({
        dtlsParameters: event.dtlsParameters,
        transportId: event.transportId,
        iceCandidates: user.producerTransport,
      });
      send(ws, "producerConnected", "producer connected!");
    };

    const onProduce = async (
      event: any,
      ws: WebSocket,
      websocket: WebSocket.Server
    ) => {
      const { kind, rtpParameters } = event;
      user.producer = await user.producerTransport!.produce({
        kind,
        rtpParameters,
      });
      const resp = {
        id: user.producer!.id,
        userData: user.userData,
      };
      send(ws, "produced", resp);
      broadcast(websocket, "newProducer", resp);
    };

    const createConsumer = async (
      producer: Producer,
      rtpCapabilities: RtpCapabilities,
      userData: any,
      transportId: string
    ) => {
      if (
        !mediasoupRouter.canConsume({
          producerId: producer.id,
          rtpCapabilities,
        })
      ) {
        console.log("Cannot consume!");
        return;
      }

      let c1: Consumer;

      try {
        c1 = await user.consumerTransports!.get(transportId)!.consume({
          producerId: producer.id,
          rtpCapabilities: rtpCapabilities,
          paused: producer.kind === "video",
        });

        // Only if there is no sonsumer
        if (user.consumers.has(producer.id)) {
          return;
        } else {
          user.consumers.set(producer.id, c1);
        }
      } catch (error) {
        console.error("consume failed: ", error);
        return;
      }

      return {
        producerId: producer.id,
        id: c1.id,
        kind: c1.kind,
        rtpParameters: c1.rtpParameters,
        type: c1.type,
        producerPaused: c1.producerPaused,
        userData: userData,
        transportId: transportId,
      };
    };
  });

  const isJson = (str: string) => {
    try {
      JSON.parse(str);
    } catch (error) {
      return false;
    }
    return true;
  };
};

export { WebSocketConnection };
