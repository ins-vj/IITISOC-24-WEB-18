"use client";
import React, { ReactNode } from "react";
import { useState, useEffect } from "react";
import { getUserDetails, UserDetailsFC } from "@/helpers/api";
import "@/components/VideoCallV1/VideoCall.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const Detector = dynamic(
  () => import("@/components/EmotionDetection/Detector"),
  {
    ssr: false,
  }
);

const VideoCallComponent = dynamic(
  () => import("@/components/VideoCallV1/VideoCall"),
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
  const [video, setVideo] = useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const c1 = await getUserDetails();
      if (!c1.username) {
        router.push("/login");
      }
      setData((prev) => c1);
    };
    fetchData();
    setLoading(false);
  }, []);

  if (!proceed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-xl font-semibold">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Detector
              video={video}
              audio={audio}
              setVideo={setVideo}
              setAudio={setAudio}
            />
            <button
              className="join-button mt-8"
              onClick={() => {
                setProceed(true);
              }}
            >
              Join Now as {data?.username}
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      {proceed && (
        <VideoCallComponent
          channelName={videocallId}
          appId={APP_ID}
          video={video}
          audio={audio}
        />
      )}
    </div>
  );
};

export default VideoCallLoader;
