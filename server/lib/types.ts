import { Consumer } from "mediasoup/node/lib/Consumer";
import { Producer } from "mediasoup/node/lib/Producer";
import { Transport } from "mediasoup/node/lib/Transport";

export interface User {
  uuid: string;
  producerTransports: Map<string, Transport>;
  consumerTransports: Map<string, Transport>;
  producers: Map<string, Producer>;
  consumers: Map<string, Consumer>;
  userData?: any;
}
