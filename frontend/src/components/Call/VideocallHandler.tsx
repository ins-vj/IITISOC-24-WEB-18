import React, { createContext, useState, useEffect } from "react";
import { VideoCallConnector } from "./VideocallConnector";
import { getUserDetails } from "@/helpers/api";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

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
  remoteVideos: Map<string, { userData: any; stream: MediaStream }>;
  videocallconnector: VideoCallConnector;
}

export const VideoCallContext = createContext<VideoCallContextProps>(null);

let VCConnector: VideoCallConnector;

export const VideoCallProvider = (props: {
  children: React.ReactNode;
  meetId: string;
}) => {
  const [userData, setUserData] = useState<any>();
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [screen, setScreen] = useState(false);
  const [localVideo, setLocalVideo] = useState<MediaStream>(null);
  const [remoteVideos, setRemoteVideos] = useState<
    Map<string, { userData: any; stream: MediaStream }>
  >(new Map());
  const [startCall, setStartCall] = useState(false);
  const router = useRouter();

  const addRemoteVideo = (
    producerId: string,
    videoStream: MediaStream,
    userData: any
  ) => {
    // TODO Notify users that a user connected

    setRemoteVideos((prev) => {
      const newMap = new Map(prev);
      console.log(producerId);
      newMap.delete(producerId);
      newMap.set(producerId, { stream: videoStream, userData: userData });
      return newMap;
    });
  };

  const removeRemoteVideo = (producerId: string) => {
    // TODO Notify users that a user disconnected

    setRemoteVideos((prev) => {
      console.log(producerId);
      const newMap = new Map(prev);
      console.log(newMap);
      newMap.delete(producerId);
      return newMap;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const c1 = await getUserDetails();
      if (!c1.username) {
        router.push("/login");
      }
      setUserData(c1);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (startCall) {
      const start = async () => {
        VCConnector.startSending(true);
      };
      start();
    }
  }, [startCall]);

  useEffect(() => {
    try {
      if (userData.username) {
        VCConnector = new VideoCallConnector(
          addRemoteVideo,
          removeRemoteVideo,
          setLocalVideo,
          userData,
          props.meetId
        );
      }
    } catch (error) {
      return;
    }
  }, [userData]);

  useEffect(() => {
    if (VCConnector && VCConnector.localVideo) {
      const localvideo = VCConnector.localVideo
        .getTracks()
        .find((track) => track.kind === "video");
      const localaudio = VCConnector.localVideo
        .getTracks()
        .find((track) => track.kind === "audio");

      localvideo.enabled = video;
      localaudio.enabled = audio;
    }
  }, [video, audio]);

  return (
    <VideoCallContext.Provider
      value={{
        video,
        audio,
        setVideo,
        setAudio,
        localVideo,
        remoteVideos,
        startCall,
        setStartCall,
        screen,
        setScreen,
        videocallconnector: VCConnector,
      }}
    >
      {!userData && <CircularProgress />}
      {userData && props.children}
    </VideoCallContext.Provider>
  );
};
