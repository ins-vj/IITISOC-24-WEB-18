import { Router } from "mediasoup/node/lib/Router";
import { config } from "../config";
import {
  DtlsParameters,
  IceParameters,
} from "mediasoup/node/lib/fbs/web-rtc-transport";
import { Worker } from "mediasoup/node/lib/Worker";
import { WebRtcTransportOptions } from "mediasoup/node/lib/WebRtcTransport";

export const createWebRTCTransport = async (
  mediasoupRouter: Router,
  worker: Worker
) => {
  const { maxIncomeBitrate, initialAvailableOutgoingBitrate } =
    config.webRtcTransport;

  const transport = await mediasoupRouter.createWebRtcTransport({
    listenIps: config.webRtcTransport.listenIps,
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    initialAvailableOutgoingBitrate,
  });

  console.log("Ice parameters: ", transport.iceParameters);
  console.log("Ice iceCandidates: ", transport.iceCandidates);

  if (maxIncomeBitrate) {
    try {
      await transport.setMaxIncomingBitrate(maxIncomeBitrate);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      dtlsParameters: transport.dtlsParameters,
      iceCandidates: transport.iceCandidates,
    },
  };
};
