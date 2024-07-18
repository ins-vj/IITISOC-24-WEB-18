import React, { useContext, useEffect } from "react";
import Controlbar from "./Controlbar";
import { VideoCallContext } from "./VideocallHandler";

const VideocallComponent = () => {
  const vcContext = useContext(VideoCallContext);

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex gap-4 flex-wrap">
        <div>
          <div className="w-100 h-100">
            {Array.from(vcContext.localVideos.entries()).map(
              ([key, localUser]) => {
                return (
                  <div key={key}>
                    <video
                      ref={(videoElement) => {
                        if (videoElement) {
                          videoElement.srcObject = localUser;
                        }
                        console.log(vcContext.remoteVideos);
                      }}
                      autoPlay
                    ></video>
                    <span>Self Media</span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div id="remote-videos">
          <div className="w-100 h-100">
            {Array.from(vcContext.remoteVideos.entries()).map(
              ([key, remoteUser]) => {
                return (
                  <div key={key}>
                    <video
                      ref={(videoElement) => {
                        if (videoElement) {
                          videoElement.srcObject = remoteUser.stream;
                        }
                        console.log(vcContext.remoteVideos);
                      }}
                      autoPlay
                    ></video>
                    <span>{remoteUser.userData.username}</span>
                  </div>
                );
              }
            )}
          </div>
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
