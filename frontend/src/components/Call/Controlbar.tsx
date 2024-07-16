import React, { useContext } from "react";
import { VideoCallContext } from "./VideocallHandler";

const Controlbar = () => {
  const vcContext = useContext(VideoCallContext);
  return (
    <div>
      <button className="p-4 bg-gray-600">Mic</button>
      <button
        className="p-4 bg-gray-600"
        onClick={() => {
          vcContext.setVideo(!vcContext.video);
        }}
      >
        Camera
      </button>
      <button
        className="p-4 bg-gray-600"
        onClick={() => {
          vcContext.setScreen(!vcContext.screen);
        }}
      >
        Screen share
      </button>
      <button className="p-4 bg-gray-600">End call</button>
      <button
        className="p-4 bg-gray-600"
        onClick={() => {
          vcContext.subscribe();
        }}
      >
        Subscribe
      </button>
      {/* <button>Show users</button> */}
    </div>
  );
};

export default Controlbar;
