import React, { createContext, useState, useEffect } from "react";
import { VideoCallConnector } from "./VideocallConnector";

interface VideoCallContextProps {
  video: boolean;
  audio: boolean;
  startCall: boolean;
  screen: boolean;
  setVideo: (video: boolean) => void;
  setAudio: (audio: boolean) => void;
  setStartCall: (call: boolean) => void;
  setScreen: (screen: boolean) => void;
  localVideo: MediaStream;
  remoteVideo: MediaStream;
  videocallconnector: VideoCallConnector;
}

export const VideoCallContext = createContext<VideoCallContextProps>(null);

let VCConnector: VideoCallConnector;

export const VideoCallProvider = (props: {
  children: React.ReactNode;
  meetId: string;
}) => {
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [screen, setScreen] = useState(false);
  const [localVideo, setLocalVideo] = useState<MediaStream>(null);
  const [remoteVideo, setRemoteVideo] = useState<MediaStream>(null);
  const [startCall, setStartCall] = useState(false);

  useEffect(() => {
    if (startCall && (video || screen)) {
      const start = async () => {
        VCConnector.startSending(video);
      };
      start();
    }
  }, [startCall, video, screen]);

  useEffect(() => {
    VCConnector = new VideoCallConnector(setRemoteVideo, setLocalVideo);
  }, []);

  return (
    <VideoCallContext.Provider
      value={{
        video,
        audio,
        setVideo,
        setAudio,
        localVideo,
        remoteVideo,
        startCall,
        setStartCall,
        screen,
        setScreen,
        videocallconnector: VCConnector,
      }}
    >
      {props.children}
    </VideoCallContext.Provider>
  );
};
