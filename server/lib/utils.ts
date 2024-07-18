import WebSocket from "ws";

export const send = (ws: WebSocket, type: string, message: any) => {
  const msg = {
    type,
    data: message,
  };

  const resp = JSON.stringify(msg);
  ws.send(resp);
};

export const broadcast = (ws: WebSocket.Server, type: string, msg: any) => {
  const resp = JSON.stringify({
    type,
    data: msg,
  });
  ws.clients.forEach((client) => {
    client.send(resp);
  });
};
