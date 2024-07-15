"use client";
import React, { createContext, useState, useEffect } from "react";
import * as Mediasoup from "mediasoup-client";

const WebSocketURL = "ws://localhost:4444/ws";

interface VideoCallContextProps {
  video: boolean;
  audio: boolean;
  setVideo: (video: boolean) => void;
  setAudio: (audio: boolean) => void;
}

export const VideoCallContext = createContext<VideoCallContextProps>(null);

export const VideoCallProvider = (props: {
  children: React.ReactNode;
  meetId: string;
}) => {
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [socket, setSocket] = useState<WebSocket>(null);
  const [device, setDevice] = useState<Mediasoup.Device>(null);
  const [localVideo, setLocalVideo] = useState(null);
  let producer: Mediasoup.types.Producer;

  useEffect(() => {
    const socket = new WebSocket(WebSocketURL);
    setSocket(socket);

    socket.onopen = () => {
      console.log("connected");
      socket.send(JSON.stringify({ type: "getRouterRtpCapabilities" }));
    };

    socket.onmessage = async (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      console.log(data);

      switch (data.type) {
        case "routerCapabilities":
          await onRouterCapabilities(data);
          break;
        case "producerTransportCreated":
          await onProducerTransportCreated(data);
          break;
        default:
          console.error("Unknown message type:", data.type);
      }
    };

    // return () => {
    //   socket.close();
    // };
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
      setDevice(newDevice);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onRouterCapabilities = async (data) => {
    await loadDevice(data.data);
    console.log("Device loaded");
    publish();
  };

  const onProducerTransportCreated = async (data) => {
    if (data.error) {
      console.error("Producer Transport create error!");
      return;
    }

    const transport = device.createSendTransport(data.data);

    transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
      socket.send(
        JSON.stringify({ type: "connectProducerTransport", dtlsParameters })
      );
      socket.addEventListener("producerConnected", callback);
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
        socket.addEventListener("published", (event: any) =>
          callback(event.data.id)
        );
      }
    );

    transport.on("connectionstatechange", (state) => {
      switch (state) {
        case "connecting":
          console.log("publishing");
          break;
        case "connected":
          console.log("published");
          break;
        case "failed":
          transport.close();
          console.log("failed");
          break;
        default:
          console.log("default: ", state);
          break;
      }
    });

    try {
      const stream = await getUserMedia(transport, true);
      const track = stream.getVideoTracks()[0];
      producer = await transport.produce({ track });
    } catch (error) {
      console.error(error);
    }
  };

  const publish = () => {
    if (device) {
      socket.send(
        JSON.stringify({
          type: "createProducerTransport",
          forceTcp: false,
          routerRtpCapabilities: device.rtpCapabilities,
        })
      );
    }
  };

  return (
    <VideoCallContext.Provider value={{ video, audio, setVideo, setAudio }}>
      {props.children}
    </VideoCallContext.Provider>
  );
};
