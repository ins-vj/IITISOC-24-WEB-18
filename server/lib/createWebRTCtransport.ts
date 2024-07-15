import { Router } from "mediasoup/node/lib/Router";
import { config } from "../config";
import {
  DtlsParameters,
  IceParameters,
} from "mediasoup/node/lib/fbs/web-rtc-transport";

export const createWebRTCTransport = async (mediasoupRouter: Router) => {
  const { maxIncomeBitrate, initialAvailableOutgoingBitrate } =
    config.webRtcTransport;

  const transport = await mediasoupRouter.createWebRtcTransport({
    listenIps: config.webRtcTransport.listenIps,
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    initialAvailableOutgoingBitrate,
  });

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
      iceParameters: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
};
