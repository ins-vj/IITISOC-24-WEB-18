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
import { ReactElement, useEffect, useRef, useState } from "react";
import "./VideoCall.css";
import ControlBar from "./ControlBar";
import VideoShow from "./VideoShow";
import FocusVideo from "./FocusVideo";
import { CircularProgress } from "@mui/material";
import { VideoPlayerConfig } from "agora-rtc-react";
import * as faceapi from "@vladmandic/face-api";
import { useLocalScreenTrack } from "agora-rtc-react";

function Videos(props: {
  channelName: string;
  AppID: string;
  client: IAgoraRTCClient;
  video: boolean;
  audio: boolean;
}) {
  const [videoInFocus, setVideoInFocus] = useState<ReactElement | null>(null);
  const [cam, setCam] = useState<string | null>();
  const [emotion, setEmotion] = useState<any>();
  const [usersEmotions, setUsersEmotions] = useState<any>({});

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
    const c1 = localCameraTrack;

    if (c1) {
      setCam(c1.getTrackId());
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
    uid: undefined,
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
      const video = document.getElementById(`video_${cam}`) as HTMLVideoElement;

      if (video) {
        const detectionsWithExpression = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        const predicted_emotion =
          detectionsWithExpression?.expressions.asSortedArray()[0].expression;
        setEmotion((emotion: any) => predicted_emotion);
        if (
          predicted_emotion &&
          predicted_emotion !== "neutral" &&
          predicted_emotion !== undefined
        ) {
          console.log(predicted_emotion);
          // Update emotion logic here if needed
        }
      }
    } else {
    }
  };

  useEffect(() => {
    const load = async () => {
      await loadModels();
    };
    load();
  }, []);

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
        {!(remoteUsers.length > 0) && (
          <div className="relative">
            <FocusVideo onClick={exitFullscreen} emotion={emotion}>
              <LocalVideoTrack track={localCameraTrack} play={true} />
            </FocusVideo>
          </div>
        )}
        {videoInFocus && (
          <FocusVideo onClick={exitFullscreen}>{videoInFocus}</FocusVideo>
        )}
        <div className="">
          {remoteUsers.length === 1 && (
            <FocusVideo onClick={exitFullscreen}>
              <div className="w-full h-full relative">
                <div className="absolute left-0 bottom-0 text-[#DC9750] z-30">
                  {remoteUsers[0].uid}
                </div>
                <RemoteUser user={remoteUsers[0]} />
              </div>
            </FocusVideo>
          )}
          {remoteUsers.length > 1 && (
            <VideoShow
              users={remoteUsers}
              makeFullscreen={makeFullscreen}
              usersEmotions={usersEmotions}
            />
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
  useEffect(() => {
    AgoraRTC.setLogLevel(0);
    AgoraRTC.disableLogUpload();
  }, []);

  const client = useRTCClient(
    AgoraRTC.createClient({
      codec: "vp8",
      mode: "rtc",
    })
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
