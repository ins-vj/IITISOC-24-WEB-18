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
import { useEffect, useState } from "react";

function Videos(props: { channelName: string; AppID: string }) {
  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);

  const [toPublish, setToPublish] = useState<
    [IMicrophoneAudioTrack | null, ICameraVideoTrack | null]
  >([null, null]);

  useEffect(() => {
    if (video) {
      setToPublish([toPublish[0], localCameraTrack]);
    } else {
      setToPublish([toPublish[0], null]);
    }

    if (audio) {
      setToPublish([toPublish[0], toPublish[1]]);
    } else {
      setToPublish([null, toPublish[1]]);
    }
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
    <div className="flex flex-col justify-between content-center w-screen h-screen relative">
      <div
        className={`grid justify-center absolute h-screen w-screen py-[10vh] ${
          remoteUsers.length < 3 && remoteUsers.length > 0
            ? "grid-cols-2"
            : null
        }`}
      >
        {remoteUsers.length > 0 ? (
          <div className="aspect-square absolute h-40 right-8 bottom-8 rounded-lg overflow-hidden">
            <LocalVideoTrack track={localCameraTrack} play={true} />
          </div>
        ) : (
          <div className="aspect-square max-h-[80vh] max-w-[80vw] rounded-lg overflow-hidden">
            <LocalVideoTrack track={localCameraTrack} play={true} />
          </div>
        )}
        {remoteUsers.map((user, index) => (
          <div
            key={index}
            className="aspect-square w-[10vw] rounded-lg overflow-hidden"
          >
            <RemoteUser key={index} user={user} />
          </div>
        ))}
      </div>
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
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center gap-8 pb-4">
        <a
          className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          href="/"
        >
          End Call
        </a>
        <button className="px-5 py-2 bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 text-white font-medium w-30">
          Mute
        </button>
        <button className="px-5 py-2 bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 text-white font-medium w-30">
          Video
        </button>
      </div>
    </AgoraRTCProvider>
  );
};

export default Call;
