"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import { ReactElement, ReactHTML, useEffect, useState } from "react";
import "./VideoCall.css";
import ControlBar from "./ControlBar";
import VideoShow from "./VideoShow";
import FocusVideo from "./FocusVideo";
import { divider } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { VideoPlayerConfig } from "agora-rtc-sdk-ng";

function Videos(props: { channelName: string; AppID: string }) {
  const toggleFocus = (e: HTMLElement) => {
    if (e.classList.contains("inFocus")) {
      e.classList.remove("inFocus");
      document.getElementById("focus-div")?.classList.add("invisible");
      document.getElementById("focus-div")?.classList.remove("visible");
      if (e.id === "selfVideo") {
        e.className =
          "aspect-square fixed h-40 right-8 bottom-8 rounded-lg overflow-hidden bg-gray-400 z-40";
        document.getElementById("videoBody")?.append(e);
        return;
      }
      if (remoteUsers.length > 1) {
        e.className = "md:h-72 md:w-72 w-[45vw] aspect-square bg-black";
      } else {
        e.className = "absolute flex justify-center w-screen";
      }
      document.getElementById("usersDiv")?.append(e);
    } else {
      e.classList.forEach((c) => e.classList.remove(c));
      e.classList.add("inFocus");
      e.classList.add("bg-black");
      document.getElementById("focus-div")?.classList.add("visible");
      document.getElementById("focus-div")?.classList.remove("invisible");
      document.getElementById("focus-div")?.append(e);
    }
  };

  const [videoInFocus, setVideoInFocus] = useState<ReactElement | null>(null);

  const makeFullscreen = (e: ReactElement) => {
    if (videoInFocus) {
      setVideoInFocus(null);
    } else {
      setVideoInFocus(e);
    }
  };
  const exitFullscreen = () => setVideoInFocus(null);

  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);

  const updateLocalTracks = async () => {
    if (localCameraTrack) {
      await localCameraTrack.setMuted(!video);
    }
    if (localMicrophoneTrack) {
      await localMicrophoneTrack.setMuted(!audio);
    }
  };

  useEffect(() => {
    updateLocalTracks();
  }, [video, audio]);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());

  const vConfig: VideoPlayerConfig = {
    fit: "contain",
  };

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">
        <CircularProgress color="warning" label="Loading..." />
      </div>
    );

  return (
    <div id="videoBody" className="absolute h-screen w-screen">
      {!(remoteUsers.length > 0) && (
        <FocusVideo onClick={exitFullscreen}>
          <LocalVideoTrack track={localCameraTrack} play={true} />
        </FocusVideo>
      )}
      {videoInFocus && (
        <FocusVideo onClick={exitFullscreen}>{videoInFocus}</FocusVideo>
      )}
      <div className="h-screen w-screen">
        {remoteUsers.length === 1 && (
          <FocusVideo onClick={exitFullscreen}>
            <RemoteUser user={remoteUsers[0]} videoPlayerConfig={vConfig} />
          </FocusVideo>
        )}
        {remoteUsers.length > 1 && (
          <VideoShow users={remoteUsers} makeFullscreen={makeFullscreen} />
        )}
      </div>
      <ControlBar
        video={video}
        audio={audio}
        toggleAudio={() => {
          setAudio(!audio);
        }}
        toggleVideo={() => {
          setVideo(!video);
        }}
        toggleFocus={toggleFocus}
        localCameraTrack={localCameraTrack}
        otherUsers={remoteUsers.length > 0}
        makeFullscreen={makeFullscreen}
      />
    </div>
  );
}

const Call = (props: { channelName: string; appId: string }) => {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName} AppID={props.appId} />
    </AgoraRTCProvider>
  );
};

export default Call;
