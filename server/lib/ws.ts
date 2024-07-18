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
import WebSocket from "ws";
import { createWebRTCTransport } from "./createWebRTCtransport";
import { User } from "./types";
import { send, broadcast } from "./utils";
import { Room } from "./room";
import { createWorker } from "./worker";

let Rooms: Map<string, Room> = new Map();
let worker: Worker;

const WebSocketConnection = async (websock: WebSocket.Server) => {
  try {
    worker = await createWorker();
  } catch (error) {
    throw error;
  }

  websock.on("connection", (ws: WebSocket, req: any) => {
    let uuid: string;
    let user: User;
    let roomId: string;
    let room: Room;

    // Code To get ROOM ID and UUID

    try {
      uuid = new URL(req.url, "http://localhost").searchParams.get("uuid")!;
      roomId = new URL(req.url, "http://localhost").searchParams.get("roomId")!;
      if (!uuid || !roomId) {
        send(ws, "error", "UUID or ROOMID not provided");
        ws.close();
      }
    } catch (error) {
      console.log(error);
      return;
    }

    if (!Rooms.has(roomId)) {
      Rooms.set(roomId, new Room({ id: roomId, worker: worker }));
    }
    room = Rooms.get(roomId)!;
    console.log(room);

    if (!room.users.has(uuid)) {
      room.users.set(uuid, {
        uuid: uuid,
        consumers: new Map<string, Consumer>(),
        consumerTransports: new Map(),
        producerTransports: new Map(),
        producers: new Map(),
      });
    }
    user = room.users.get(uuid)!;

    ws.on("close", () => {
      const producerIds = Array.from(user.producers.values()).map((p) => p.id);
      broadcast(websock, "userDisconnected", producerIds);
      user.consumerTransports &&
        user.consumerTransports?.forEach((consumer) => consumer.close());
      user.producerTransports &&
        user.producerTransports.forEach((transport) => transport.close());
      user.producers && user.producers.forEach((producer) => producer.close());
      room.users.delete(uuid);
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
        case "stopProducer":
          await onStopProducer(event, ws, websock);
          break;
        case "emotionUpdate":
          await onEmotionUpdate(event, websock);
          break;

        default:
          console.log(event);
      }
    });

    const onRouterRtpCapabilities = async (event: any, ws: WebSocket) => {
      if (!room.router) {
        await room.setRouter();
      }
      user.userData = event.data;
      send(ws, "routerCapabilities", room.router!.rtpCapabilities);
    };

    const onEmotionUpdate = async (event: any, websock: WebSocket.Server) => {
      console.log(event);
      broadcast(websock, "emotionUpdate", event.data);
    };

    const onStopProducer = async (
      event: any,
      ws: WebSocket,
      websock: WebSocket.Server
    ) => {
      try {
        broadcast(websock, "userDisconnected", [
          user.producers.get(event.data.producerType)!.id,
        ]);
        user.producers.get(event.data.producerType)?.close();
        user.producers.delete(event.data.producerType);
        // TODO delete transport also
      } catch (error) {
        console.log(error);
      }
    };

    const onCreateProducerTransport = async (event: any, ws: WebSocket) => {
      console.log(event);
      try {
        const { transport, params } = await createWebRTCTransport(
          room.router!,
          worker,
          event.producerType
        );
        transport.on("@close", () => {
          user.consumers.forEach((consumer) => {
            consumer.close();
          });
        });
        user.producerTransports!.set(event.producerType, transport);
        console.log("PTRANSPORTS: ", user.producerTransports);
        params;
        send(ws, "producerTransportCreated", params);
      } catch (error) {
        console.error(error);
        ws.send(`error: ${error}`);
      }
    };

    const oncreateConsumerTransport = async (event: any, ws: WebSocket) => {
      console.log("CREATEDATA", event);
      try {
        const { transport, params } = await createWebRTCTransport(
          room.router!,
          worker
        );
        user.consumerTransports?.set(params.id, transport);
        const newParams = {
          ...params,
          appData: { userId: event.userId },
        };
        send(ws, "subtransportCreated", newParams);
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
      const userios = Object.fromEntries(room.users);
      send(ws, "getUsers", userios);
    };

    const onConsume = async (event: any, ws: WebSocket) => {
      console.log("onConsume data:", event);

      // Create an array of promises for each user
      const consumerPromises = Array.from(room.users.entries()).map(
        async ([key, user1]) => {
          if (user1.uuid === event.userId) {
            const allConsumers: any = {};
            if (user1.producers) {
              for (const [
                producerType,
                producer,
              ] of user1.producers.entries()) {
                const c1 = await createConsumer(
                  producer,
                  event.rtpCapabilities,
                  user1.userData!,
                  event.transportId
                );
                if (c1) {
                  allConsumers[producerType] = c1;
                }
              }
            }

            if (Object.keys(allConsumers).length > 0) {
              console.log("ONCONSUME RES: ", allConsumers);
              send(ws, "subscribed", allConsumers);

              return allConsumers;
            }
          }
        }
      );

      const consumerResults = await Promise.all(consumerPromises);
    };

    const onConnectProducerTransport = async (event: any, ws: WebSocket) => {
      console.log("connect event: ", event);
      await user.producerTransports?.get(event.producerType)!.connect({
        dtlsParameters: event.dtlsParameters,
        transportId: event.transportId,
        iceCandidates: user.producerTransports?.get(event.producerType),
      });
      send(ws, "producerConnected", "producer connected!");
    };

    const onProduce = async (
      event: any,
      ws: WebSocket,
      websocket: WebSocket.Server
    ) => {
      const { kind, rtpParameters, producerType } = event;
      user.producers.set(
        producerType,
        await user.producerTransports?.get(event.producerType)!.produce({
          kind,
          rtpParameters,
        })
      );
      const resp = {
        id: user.userData.pk,
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
        !room.router!.canConsume({
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
