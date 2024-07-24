"use client";
import {
  VideoCallContext,
  VideoCallProvider,
} from "@/components/VideoCallV2/lib/VideocallHandler";
import { getMeetDetails } from "@/helpers/api";
import dynamic from "next/dynamic";
import React, { useContext, useEffect } from "react";

const VideocallComponent = dynamic(
  () => import("@/components/VideoCallV2/UI/Videocall"),
  {
    ssr: false,
  }
);

const CallPage = ({ params }: { params: { callId: string } }) => {
  return (
    <VideoCallProvider meetId={params.callId}>
      <div>{params.callId}</div>
      <VideocallComponent />
    </VideoCallProvider>
  );
};

export default CallPage;
