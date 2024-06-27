import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/VideoCall/loader";

const APP_ID = process.env.AGORA_APP_ID || "";
const VideoCallComponent = dynamic(
  () => import("@/components/VideoCall/VideoCall"),
  {
    ssr: false,
  }
);

const VideoCall = ({ params }: { params: { videocallId: string } }) => {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <Loader>
        <VideoCallComponent channelName={params.videocallId} appId={APP_ID} />
      </Loader>
    </div>
  );
};

export default VideoCall;
