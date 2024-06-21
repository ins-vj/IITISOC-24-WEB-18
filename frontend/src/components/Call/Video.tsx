"use client";
import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId: "84be8833ff4f4500bbdbfc6b16e4d0ff",
    channel: "test",
    token: null,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  );
};

export default VideoCall;
