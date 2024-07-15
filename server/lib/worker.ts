import * as medisoup from "mediasoup";
import { config } from "../config";
import { Worker } from "mediasoup/node/lib/Worker";
import { Router } from "mediasoup/node/lib/Router";

const worker: Array<{
  worker: Worker;
  router: Router;
}> = [];

let nextMediasoupWorkerIdx = 0;

const createWorker = async () => {
  const worker = await medisoup.createWorker({
    logLevel: config.mediasoup.worker.logLevel,
    logTags: config.mediasoup.worker.logTags,
    rtcMinPort: config.mediasoup.worker.rtcMinPort,
    rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
  });

  worker.on("died", (error) => {
    console.error(
      "mediasoup worker died, exiting in 2 seconds... ",
      worker.pid
    );
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  });

  const mediaCodecs = config.router.mediaCodes;
  const mediasoupRouter = await worker.createRouter({ mediaCodecs });
  return mediasoupRouter;
};

export { createWorker };
