"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  ILocalAudioTrack,
  ILocalVideoTrack,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
  IAgoraRTCClient,
  useRTCScreenShareClient,
  AgoraRTCScreenShareProvider,
} from "agora-rtc-react";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import { ReactElement, ReactHTML, useEffect, useRef, useState } from "react";
import "./VideoCall.css";
import ControlBar from "./ControlBar";
import VideoShow from "./VideoShow";
import FocusVideo from "./FocusVideo";
import { CircularProgress } from "@mui/material";
import { VideoPlayerConfig } from "agora-rtc-react";
import * as faceapi from "@vladmandic/face-api";
import { useLocalScreenTrack } from "agora-rtc-react";
import { ILocalTrack } from "agora-rtc-react";

function Videos(props: {
  channelName: string;
  AppID: string;
  client: IAgoraRTCClient;
  video: boolean;
  audio: boolean;
}) {
  const [videoInFocus, setVideoInFocus] = useState<ReactElement | null>(null);
  const [cam, setCam] = useState<ICameraVideoTrack | null>();
  const [emotion, setEmotion] = useState<any>();

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

  useEffect(() => {
    const c1 = localCameraTrack?.clone();
    console.log(c1);
    console.log("check");
    if (c1) {
      setCam(c1);
      console.log("applied");
    }
  }, [isLoadingCam]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  const [video, setVideo] = useState(props.video);
  const [audio, setAudio] = useState(props.audio);
  const [screenShare, setScreenShare] = useState(false);
  const screenShareClient = useRTCScreenShareClient(props.client);

  const {
    screenTrack: screenTrack,
    isLoading: isScreenLoading,
    error,
  } = useLocalScreenTrack(screenShare, {}, "disable")!;

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

  if (screenShare && !isScreenLoading && screenTrack) {
    console.log(screenTrack);
    const screenShareOn = async () => {
      await screenShareClient?.publish(screenTrack);
    };
    screenShareOn();
  } else {
  }

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

  const loadModels = async () => {
    const MODEL_URL = `/models`;
    await Promise.all([
      faceapi.nets.tinyFaceDetector.load(MODEL_URL),
      faceapi.nets.faceExpressionNet.load(MODEL_URL),
    ]);
  };

  const predictEmotion = async () => {
    if (cam) {
      const video = document.getElementById(
        `video_${cam.getTrackId()}`
      ) as HTMLVideoElement;

      if (video) {
        const detectionsWithExpression = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        setEmotion(
          detectionsWithExpression?.expressions.asSortedArray()[0].expression
        );
      }
    } else {
      // console.log("ggh");
    }
    // console.log("triggered");
  };

  useEffect(() => {
    const load = async () => {
      await loadModels();
    };
    load();
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      await predictEmotion();
    }, 1000);
    return () => clearInterval(interval);
  }, [emotion, cam]);

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">
        <CircularProgress color="warning" />
        Loading...
      </div>
    );

  return (
    <AgoraRTCScreenShareProvider client={screenShareClient!}>
      <div
        id="videoBody"
        className="absolute h-screen w-screen flex flex-col md:flex-row md:justify-center items-center md:items-start bg-[#0d111c]"
      >
        <div className="-z-50 w-[50vw] h-[50vh] absolute top-0 left-0">
          <LocalVideoTrack track={cam} play={true} />
        </div>
        <div className="text-white text-xl absolute left-8 top-8 z-50">
          {emotion}
        </div>
        {!(remoteUsers.length > 0) && (
          <div className="relative">
            <FocusVideo onClick={exitFullscreen} emotion={emotion}>
              <LocalVideoTrack track={localCameraTrack} play={true} />
            </FocusVideo>
            <canvas className="absolute h-full w-full top-0 left-0"></canvas>
          </div>
        )}
        {videoInFocus && (
          <FocusVideo onClick={exitFullscreen}>{videoInFocus}</FocusVideo>
        )}
        <div className="">
          {remoteUsers.length === 1 && (
            <FocusVideo onClick={exitFullscreen}>
              <RemoteUser user={remoteUsers[0]} />
            </FocusVideo>
          )}
          {remoteUsers.length > 1 && (
            <VideoShow users={remoteUsers} makeFullscreen={makeFullscreen} />
          )}
        </div>
        <ControlBar
          video={video}
          audio={audio}
          screenShare={screenShare}
          toggleAudio={() => {
            setAudio(!audio);
          }}
          toggleVideo={() => {
            setVideo(!video);
          }}
          toggleScreenShare={() => {
            setScreenShare(!screenShare);
          }}
          localCameraTrack={localCameraTrack}
          otherUsers={remoteUsers.length > 0}
          makeFullscreen={makeFullscreen}
          emotion={emotion}
        />
      </div>
    </AgoraRTCScreenShareProvider>
  );
}

const Call = (props: {
  channelName: string;
  appId: string;
  video: boolean;
  audio: boolean;
}) => {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos
        channelName={props.channelName}
        AppID={props.appId}
        client={client}
        video={props.video}
        audio={props.audio}
      />
    </AgoraRTCProvider>
  );
};

export default Call;
