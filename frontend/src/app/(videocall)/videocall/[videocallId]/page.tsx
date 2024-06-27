import React from "react";
import dynamic from "next/dynamic";

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
      <VideoCallComponent channelName={params.videocallId} appId={APP_ID} />
    </div>
  );
};

export default VideoCall;
