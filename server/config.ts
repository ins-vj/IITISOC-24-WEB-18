import os from "os";
import {
  RtpCodecCapability,
  TransportListenInfo,
  WorkerLogLevel,
  WorkerLogTag,
} from "mediasoup/node/lib/types";

const announcedIp = process.env.ANNOUNCED_IP;

export const config = {
  listenIp: "0.0.0.0",
  listenPort: 3016,

  mediasoup: {
    numWorkers: Object.keys(os.cpus()).length,
    worker: {
      rtcMinPort: 10000,
      rtcMaxPort: 10100,
      logLevel: "debug" as WorkerLogLevel,
      logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp"] as WorkerLogTag[],
    },
  },

  router: {
    mediaCodes: [
      {
        kind: "audio",
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: "video",
        mimeType: "video/VP8",
        clockRate: 90000,
        parameters: {
          "x-google-start-bitrate": 1000,
        },
      },
    ] as RtpCodecCapability[],
  },

  webRtcTransport: {
    listenIps: [
      {
        ip: "0.0.0.0",
        announcedIp: announcedIp,
      },
    ] as TransportListenInfo[],
    maxIncomeBitrate: 150000,
    initialAvailableOutgoingBitrate: 1000000,
    stunServers: [{ urls: "stun:stun.l.google.com:19302" }],
  },

  iceServers: [
    { urls: "stun.l.google.com:19302" },
    {
      urls: "stun1.l.google.com:19302,",
    },
  ],
};
