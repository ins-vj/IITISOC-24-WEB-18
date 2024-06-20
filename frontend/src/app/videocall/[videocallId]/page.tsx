import React from "react";
import dynamic from "next/dynamic";

const VideoCallComponent = dynamic(
  () => import("@/components/VideoCall/VideoCall"),
  {
    ssr: false,
  }
);

const VideoCall = ({ params }: { params: { videocallId: string } }) => {
  const APP_ID = process.env.AGORA_APP_ID || "";
  return (
    <div className="w-screen h-screen relative">
      <div className="absolute left-8 top-8 text-xl font-semibold">
        {params.videocallId}
      </div>
      <VideoCallComponent channelName={params.videocallId} appId={APP_ID} />
    </div>
  );
};

export default VideoCall;
