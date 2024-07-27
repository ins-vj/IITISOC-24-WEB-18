"use client";
import {
  VideoCallContext,
  VideoCallProvider,
} from "@/components/VideoCallV2/lib/VideocallHandler";
import { getMeetDetails } from "@/helpers/api";
import dynamic from "next/dynamic";
import React, { useContext, useEffect } from "react";

const VideocallComponent = dynamic(
  () => import("@/components/VideoCallV2/UIcopy/Videocall"),
  {
    ssr: false,
  }
);

const CallPage = ({ params }: { params: { callId: string } }) => {
  return (
    <VideoCallProvider meetId={params.callId}>
      {/* <div className=" absolute z-10 right-5 top-5 p-3 rounded-3xl h-[4rem] bg-[rgba(50,50,50,0.3)] flex justify-center items-center"> {params.callId}</div> */}
      <VideocallComponent />
    </VideoCallProvider>
  );
};

export default CallPage;