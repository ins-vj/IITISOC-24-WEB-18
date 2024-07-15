import React from "react";
import Controlbar from "./Controlbar";

const VideocallComponent = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div id="user-video">
        <div className="w-100 h-100">
          <video autoPlay></video>
        </div>
      </div>

      <div id="remote-videos">
        <div className="w-100 h-100">
          <video autoPlay></video>
        </div>
      </div>
      <div>
        <button className="p-4 bg-gray-600">Join meeting</button>
        <Controlbar />
      </div>
    </div>
  );
};

export default VideocallComponent;
