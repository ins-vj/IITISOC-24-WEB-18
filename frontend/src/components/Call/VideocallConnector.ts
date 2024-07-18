import * as Mediasoup from "mediasoup-client";
import { Transport } from "mediasoup-client/lib/types";

const WebSocketBaseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const WSURL = (uuid: string) => {
  return `${WebSocketBaseURL}?uuid=${uuid}`;
};

export const send = (ws: WebSocket, type: string, message: any) => {
  const msg = {
    type,
    data: message,
  };

  const resp = JSON.stringify(msg);
  ws.send(resp);
};

export class VideoCallConnector {
  public userData: any;
  public producer: Mediasoup.types.Producer;
  public producerTransport: Mediasoup.types.Transport;
  public consumerTransports: Map<string, Mediasoup.types.Transport>;
  public socket: WebSocket;
  public device: Mediasoup.Device;
  public addRemoteVideo: (
    producerId: string,
    videoStream: MediaStream,
    userrData: any
  ) => void;
  public removeRemoteVideo: (producerId: string) => void;
  public setLocalVideo: (videos: any) => void;

  subscribe = () => {
    const msg = {
      type: "createConsumerTransport",
      forceTcp: false,
    };
    this.socket.send(JSON.stringify(msg));
  };

  constructor(
    addRemoteVideoParam: (
      producerId: string,
      videoStream: MediaStream,
      userData: any
    ) => void,
    removeRemoteVideo: (producerId: string) => void,
    setLocalVideo: (video: MediaStream) => void,
    userData: any
  ) {
    const url = WSURL(userData.pk);
    console.log(url);
    const newSocket = new WebSocket(url);
    this.socket = newSocket;
    this.addRemoteVideo = addRemoteVideoParam;
    this.removeRemoteVideo = removeRemoteVideo;
    this.setLocalVideo = setLocalVideo;
    this.userData = userData;
    this.consumerTransports = new Map();

    newSocket.onopen = () => {
      console.log("connected");
      send(this.socket, "getRouterRtpCapabilities", userData);
    };

    newSocket.onmessage = async (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      console.log(data);

      switch (data.type) {
        case "routerCapabilities":
          await this.onRouterCapabilities(data);
          break;
        case "producerTransportCreated":
          await this.onProducerTransportCreated(data);
          break;
        case "subtransportCreated":
          await this.onsubtransportCreated(data);
          break;
        case "resumed":
          console.log(data.data);
          break;
        case "subscribed":
          await this.onSubscribed(data);
          break;
        case "newProducer":
          // await this.onNewProducer(data);
          break;
        case "userDisconnected":
          await this.onUserDisconnected(data);
          break;
        case "getUsers":
          console.log(data.data);
          break;

        default:
          console.log("Unknown message type:", data.type);
      }
    };
  }

  isJson = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  startSending = async (video: boolean) => {
    try {
      send(this.socket, "getUsers", "");
      console.log("transport: ", this.producerTransport);
      const stream: MediaStream = await this.getUserMedia(
        this.producerTransport,
        video
      );
      this.setLocalVideo(stream);
      const track = stream.getVideoTracks()[0];
      this.producer = await this.producerTransport.produce({ track });
    } catch (error) {
      console.error(error);
    }
  };

  onNewProducer = async (event: any) => {
    // await this.subscribe();
    await this.resumeVideos();
    console.log(event);
  };

  onUserDisconnected = async (event) => {
    console.log("Event: ", event.data.producerId);
    this.removeRemoteVideo(event.data.producerId);
  };

  getUserMedia = async (transport, isWebcam) => {
    if (!this.device.canProduce("video")) {
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

  loadDevice = async (routerRtpCapabilities) => {
    try {
      const newDevice = new Mediasoup.Device();
      await newDevice.load({ routerRtpCapabilities });
      this.device = newDevice;
      return newDevice;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  onRouterCapabilities = async (data) => {
    const newDevice = await this.loadDevice(data.data);
    console.log("Device loaded");
    if (this.socket && newDevice) {
      this.publish(newDevice, this.socket);
    }
  };

  onSubscribed = async (event: any) => {
    event.data.map(async (data) => {
      if (data) {
        const { producerId, id, kind, rtpParameters, type, producerPaused } =
          data;

        console.log(
          "onSubscribeEvent data: ",
          {
            id,
            producerId,
            kind,
            rtpParameters,
          },
          "consumer Transport: ",
          this.consumerTransports
        );

        let codecOptions = {};
        const consumer = await this.consumerTransports
          .get(data.transportId)
          .consume({
            id,
            producerId,
            kind,
            rtpParameters,
          });

        const stream = new MediaStream();
        stream.addTrack(consumer.track);
        this.addRemoteVideo(producerId, stream, data.userData);
      }
    });
  };

  onProducerTransportCreated = async (data) => {
    if (data.error) {
      console.error("Producer Transport create error!");
      return;
    }

    this.producerTransport = this.device.createSendTransport({
      id: data.data.id,
      iceParameters: data.data.iceParameters,
      iceCandidates: data.data.iceCandidates,
      dtlsParameters: data.data.dtlsParameters,
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Example STUN server
      ],
    });

    this.producerTransport.on(
      "connect",
      async ({ dtlsParameters }, callback, errback) => {
        this.socket.send(
          JSON.stringify({
            type: "connectProducerTransport",
            dtlsParameters,
            transportId: this.producerTransport.id,
          })
        );
        this.socket.addEventListener("message", (event: MessageEvent) => {
          let resp = JSON.parse(event.data);
          if (resp.type === "producerConnected") {
            callback();
          }
        });
      }
    );

    this.producerTransport.on(
      "produce",
      async ({ kind, rtpParameters }, callback, errback) => {
        this.socket.send(
          JSON.stringify({
            type: "produce",
            transportId: this.producerTransport.id,
            kind,
            rtpParameters,
          })
        );
        this.socket.addEventListener("published", (event: MessageEvent) => {
          console.log("produced: ", event.data);
          let resp = JSON.parse(event.data);
          if (this.isJson(event.data) && resp.type === "produced") {
            callback(resp.data.id);
          }
        });
      }
    );

    this.producerTransport.on("connectionstatechange", (state) => {
      switch (state) {
        case "connecting":
          console.log("publishing state");
          break;
        case "connected":
          console.log("published state");
          break;
        case "failed":
          console.error("failed state");
          this.producerTransport.close();
          break;
        default:
          console.log("default state:", state);
          break;
      }
    });
  };

  onsubtransportCreated = (event: any) => {
    if (event.error) {
      console.error("On subtransport create error: ", event.errback);
    }

    const transport = this.device.createRecvTransport(event.data);
    // console.log("Consumer Transport: ", transport);
    this.consumerTransports.set(transport.id, transport);
    // console.log(this.consumerTransports);

    const { rtpCapabilities } = this.device;

    transport.on("connect", ({ dtlsParameters }, callback, errback) => {
      console.log("trasnport toconnect");
      const msg = {
        type: "connectConsumerTransport",
        transportId: transport.id,
        dtlsParameters,
        rtpCapabilities,
      };

      this.socket.send(JSON.stringify(msg));

      // subConnected
      this.socket.addEventListener("message", async (event: MessageEvent) => {
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
          this.resumeVideos();
          break;
        case "failed":
          transport.close();
          console.error("connection failed");
      }
    });
    const stream = this.consume(transport);
  };

  consume = async (transport: Transport) => {
    const { rtpCapabilities } = this.device;
    const msg = {
      type: "consume",
      rtpCapabilities,
      transportId: transport.id,
    };
    this.socket.send(JSON.stringify(msg));
  };

  resumeVideos = async () => {
    const msg = {
      type: "resume",
    };
    this.socket.send(JSON.stringify(msg));
  };

  publish = (device, socket) => {
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
}
