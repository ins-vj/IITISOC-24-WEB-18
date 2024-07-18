import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/VideoCallV1/loader";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";
const VideoCallComponent = dynamic(
  () => import("@/components/VideoCallV1/VideoCall"),
  {
    ssr: false,
  }
);

const VideoCall = ({ params }: { params: { videocallId: string } }) => {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <Loader videocallId={params.videocallId} APP_ID={APP_ID} />
    </div>
  );
};

export default VideoCall;
