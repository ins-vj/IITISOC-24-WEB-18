import React, { createContext, useState, useEffect } from "react";
import * as Mediasoup from "mediasoup-client";
import { Transport } from "mediasoup-client/lib/types";

const WebSocketURL = process.env.NEXT_PUBLIC_SERVER_URL;

interface VideoCallContextProps {
  video: boolean;
  audio: boolean;
  startCall: boolean;
  screen: boolean;
  setVideo: (video: boolean) => void;
  setAudio: (audio: boolean) => void;
  setStartCall: (call: boolean) => void;
  setScreen: (screen: boolean) => void;
  localVideo: MediaStream;
  remoteVideo: MediaStream;
  subscribe: () => void;
}

export const VideoCallContext = createContext<VideoCallContextProps>(null);

let producer: Mediasoup.types.Producer;
let transport: Mediasoup.types.Transport;
let consumerTransport: Mediasoup.types.Transport;
let socket: WebSocket;
let device: Mediasoup.Device;

export const VideoCallProvider = (props: {
  children: React.ReactNode;
  meetId: string;
}) => {
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [screen, setScreen] = useState(false);
  const [localVideo, setLocalVideo] = useState<MediaStream>(null);
  const [remoteVideo, setRemoteVideo] = useState<MediaStream>(null);
  const [startCall, setStartCall] = useState(false);

  const subscribe = () => {
    const msg = {
      type: "createConsumerTransport",
      forceTcp: false,
    };
    socket.send(JSON.stringify(msg));
  };

  useEffect(() => {
    if (startCall && (video || screen)) {
      const pv = async () => {
        try {
          console.log("transport: ", transport);
          const stream = await getUserMedia(transport, video);
          const track = stream.getVideoTracks()[0];
          setLocalVideo(stream);
          producer = await transport.produce({ track });
        } catch (error) {
          console.error(error);
        }
      };
      pv();
    }
  }, [startCall, video, screen]);

  useEffect(() => {
    const newSocket = new WebSocket(WebSocketURL);
    socket = newSocket;

    newSocket.onopen = () => {
      console.log("connected");
      newSocket.send(JSON.stringify({ type: "getRouterRtpCapabilities" }));
    };

    newSocket.onmessage = async (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      console.log(data);

      switch (data.type) {
        case "routerCapabilities":
          await onRouterCapabilities(data);
          break;
        case "producerTransportCreated":
          await onProducerTransportCreated(data);
          break;
        case "subtransportCreated":
          await onsubtransportCreated(data);
          break;
        case "resumed":
          console.log(data.data);
          break;
        case "subscribed":
          await onSubscribed(data);
          break;

        default:
          console.log("Unknown message type:", data.type);
      }
    };
  }, []);

  const isJson = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getUserMedia = async (transport, isWebcam) => {
    if (!device.canProduce("video")) {
      console.error("Cannot produce video");
      return;
    }

    let stream;
    try {
      stream = isWebcam
        ? await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
        : await navigator.mediaDevices.getDisplayMedia({ video: true });
    } catch (error) {
      console.log(error);
      throw error;
    }
    return stream;
  };

  const loadDevice = async (routerRtpCapabilities) => {
    try {
      const newDevice = new Mediasoup.Device();
      await newDevice.load({ routerRtpCapabilities });
      device = newDevice;
      return newDevice;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onRouterCapabilities = async (data) => {
    const newDevice = await loadDevice(data.data);
    console.log("Device loaded");
    if (socket && newDevice) {
      publish(newDevice, socket);
    }
  };

  const onSubscribed = async (event: any) => {
    const { producerId, id, kind, rtpParameters, type, producerPaused } =
      event.data;

    console.log(
      "onSubscribeEvent data: ",
      {
        id,
        producerId,
        kind,
        rtpParameters,
      },
      "consumer Transport: ",
      consumerTransport
    );

    let codecOptions = {};
    const consumer = await consumerTransport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
    });

    const stream = new MediaStream();
    stream.addTrack(consumer.track);
    setRemoteVideo(stream);
  };

  const onProducerTransportCreated = async (data) => {
    if (data.error) {
      console.error("Producer Transport create error!");
      return;
    }

    transport = device.createSendTransport({
      id: data.data.id,
      iceParameters: data.data.iceParameters,
      iceCandidates: data.data.iceCandidates,
      dtlsParameters: data.data.dtlsParameters,
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Example STUN server
      ],
    });

    transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
      socket.send(
        JSON.stringify({
          type: "connectProducerTransport",
          dtlsParameters,
          transportId: transport.id,
        })
      );
      socket.addEventListener("message", (event: MessageEvent) => {
        console.log("connect producer transport: ", event);
        let resp = JSON.parse(event.data);
        if (resp.type === "producerConnected") {
          callback();
        }
      });
    });

    transport.on(
      "produce",
      async ({ kind, rtpParameters }, callback, errback) => {
        socket.send(
          JSON.stringify({
            type: "produce",
            transportId: transport.id,
            kind,
            rtpParameters,
          })
        );
        socket.addEventListener("published", (event: MessageEvent) => {
          console.log("produced: ", event.data);
          let resp = JSON.parse(event.data);
          if (isJson(event.data) && resp.type === "produced") {
            callback(resp.data.id);
          }
        });
      }
    );

    transport.on("connectionstatechange", (state) => {
      switch (state) {
        case "connecting":
          console.log("publishing state");
          break;
        case "connected":
          console.log("published state");
          break;
        case "failed":
          console.error("failed state");
          transport.close();
          break;
        default:
          console.log("default state:", state);
          break;
      }
    });
  };

  const onsubtransportCreated = (event: any) => {
    if (event.error) {
      console.error("On subtransport create error: ", event.errback);
    }

    const transport = device.createRecvTransport(event.data);
    console.log("subTransport : ", transport);
    consumerTransport = transport;
    transport.on("connect", ({ dtlsParameters }, callback, errback) => {
      const msg = {
        type: "connectConsumerTransport",
        transportId: transport.id,
        dtlsParameters,
      };

      socket.send(JSON.stringify(msg));

      // subConnected
      socket.addEventListener("message", (event: MessageEvent) => {
        let resp = JSON.parse(event.data);
        if (resp.type === "subConnected") {
          console.log("consumer Transport connected and callback made");
          callback();
        }
      });
    });

    transport.on("connectionstatechange", async (state) => {
      switch (state) {
        case "connecting":
          console.log("connecting");
          break;
        case "connected":
          console.log("connected");
          const msg = {
            type: "resume",
          };
          socket.send(JSON.stringify(msg));
          break;
        case "failed":
          transport.close();
          console.error("connection failed");
      }
    });
    const stream = consume(transport);
  };

  const consume = async (transport: Transport) => {
    const { rtpCapabilities } = device;
    console.log(rtpCapabilities);
    const msg = {
      type: "consume",
      rtpCapabilities,
    };
    socket.send(JSON.stringify(msg));
  };

  const publish = (device, socket) => {
    if (device && socket) {
      socket.send(
        JSON.stringify({
          type: "createProducerTransport",
          forceTcp: false,
          routerRtpCapabilities: device.rtpCapabilities,
        })
      );
    } else {
      console.error("Device or socket is not available");
    }
  };

  return (
    <VideoCallContext.Provider
      value={{
        video,
        audio,
        setVideo,
        setAudio,
        localVideo,
        remoteVideo,
        startCall,
        setStartCall,
        screen,
        setScreen,
        subscribe,
      }}
    >
      {props.children}
    </VideoCallContext.Provider>
  );
};
