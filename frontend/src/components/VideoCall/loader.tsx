"use client";
import React, { ReactNode } from "react";
import { useState, useEffect } from "react";
import { getUserDetails, UserDetailsFC } from "@/helpers/api";
import "@/components/VideoCall/VideoCall.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Detector = dynamic(
  () => import("@/components/EmotionDetection/Detector"),
  {
    ssr: false,
  }
);

const VideoCallComponent = dynamic(
  () => import("@/components/VideoCall/VideoCall"),
  {
    ssr: false,
  }
);

const VideoCallLoader = ({
  children,
  APP_ID,
  videocallId,
}: {
  children?: ReactNode;
  APP_ID: string;
  videocallId: string;
}) => {
  const router = useRouter();
  const [data, setData] = useState<UserDetailsFC>();
  const [proceed, setProceed] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [video, setVideo] = useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const c1 = await getUserDetails();
      if (!c1.username) {
        router.push("/login");
      }
      setData(c1);
    };
    fetchData();
  }, []);

  if (!proceed || waiting) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-xl font-semibold">
        <Detector
          video={video}
          audio={audio}
          setVideo={setVideo}
          setAudio={setAudio}
        />
        <button
          className="join-button mt-8"
          onClick={() => setProceed(!proceed)}
        >
          Join Now as {data?.username}
        </button>
      </div>
    );
  }
  return (
    <div>
      {children}
      <VideoCallComponent
        channelName={videocallId}
        appId={APP_ID}
        video={video}
        audio={audio}
      />
    </div>
  );
};

export default VideoCallLoader;
