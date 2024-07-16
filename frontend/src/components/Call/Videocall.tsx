import React, { useContext, useEffect } from "react";
import Controlbar from "./Controlbar";
import { VideoCallContext } from "./VideocallHandler";

const VideocallComponent = () => {
  const vcContext = useContext(VideoCallContext);
  useEffect(() => {
    const userVideo = document.getElementById("user-video") as HTMLVideoElement;
    userVideo.srcObject = vcContext.localVideo;
  }, [vcContext.localVideo]);

  useEffect(() => {
    console.log("SETTING REMOTE VIDEO");

    const remoteVideo = document.getElementById(
      "remote-video-1"
    ) as HTMLVideoElement;
    remoteVideo.srcObject = vcContext.remoteVideo;

    console.log(vcContext.remoteVideo);
  }, [vcContext.remoteVideo]);

  return (
    <div className="flex justify-center flex-col items-center">
      <div>
        <div className="w-100 h-100">
          <video autoPlay id="user-video"></video>
        </div>
      </div>

      <div id="remote-videos">
        <div className="w-100 h-100">
          <video autoPlay id="remote-video-1"></video>
        </div>
      </div>
      <div>
        <button
          className="p-4 bg-gray-600"
          onClick={(e) => {
            console.log("start");
            vcContext.setStartCall(!vcContext.startCall);
            e.currentTarget.disabled = true;
          }}
        >
          Join meeting
        </button>
        <Controlbar />
      </div>
    </div>
  );
};

export default VideocallComponent;
