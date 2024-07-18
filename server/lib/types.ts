import { Consumer } from "mediasoup/node/lib/Consumer";
import { Producer } from "mediasoup/node/lib/Producer";
import { Transport } from "mediasoup/node/lib/Transport";

export interface User {
  uuid: string;
  producerTransport?: Transport;
  consumerTransports: Map<string, Transport>;
  producer?: Producer;
  consumers: Map<string, Consumer>;
  userData?: any;
}
