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
import { ReactHTML, useEffect, useState } from "react";
import "./VideoCall.css";
import ControlBar from "./ControlBar";
import VideoShow from "./VideoShow";

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

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );

  return (
    <div id="videoBody" className="absolute h-screen w-screen">
      <div
        id="focus-div"
        className="absolute top-8 flex justify-center w-screen z-30 invisible"
      ></div>
      {remoteUsers.length > 0 ? (
        <div
          className="aspect-square fixed h-40 right-8 bottom-8 rounded-lg overflow-hidden bg-gray-400 z-40"
          id="selfVideo"
          onClick={(e) => {
            toggleFocus(e.currentTarget);
          }}
        >
          <LocalVideoTrack track={localCameraTrack} play={true} />
        </div>
      ) : (
        <div
          id="selfVideo"
          className="absolute top-8 flex justify-center w-screen"
        >
          <div className={`inFocus bg-black`}>
            <LocalVideoTrack track={localCameraTrack} play={true} />
          </div>
        </div>
      )}
      <div className="absolute top-8 h-screen w-screen flex flex-row flex-wrap justify-center gap-4 md:p-8">
        {remoteUsers.length === 1 && (
          <div className="absolute flex justify-center w-screen">
            {remoteUsers.map((user, index) => (
              <div key={index} className={`inFocus bg-black`}>
                <RemoteUser user={user} />
              </div>
            ))}
          </div>
        )}{" "}
        {remoteUsers.length > 1 && (
          <VideoShow toggleFocus={toggleFocus} users={remoteUsers} />
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
