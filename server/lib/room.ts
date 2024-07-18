import { Router } from "mediasoup/node/lib/Router";
import { User } from "./types";
import { createRouter, createWorker } from "./worker";
import { Worker } from "mediasoup/node/lib/Worker";

interface RoomProps {
  id: string;
  worker: Worker;
}

export class Room {
  public id: string;
  public router: Router | null = null;
  public users: Map<string, User> = new Map();
  public worker: Worker;

  constructor(params: RoomProps) {
    this.id = params.id;
    this.worker = params.worker;
  }

  setRouter = async () => {
    let mediasoupRouter;
    try {
      mediasoupRouter = await createRouter(this.worker);
    } catch (error) {
      throw error;
    }
    this.router = mediasoupRouter;
  };
}
